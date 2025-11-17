import express from 'express';
import QRCode from '../models/QRCode.js';
import auth from '../middleware/authenticate.js';
import { response } from '../utils/helpers.js';

const router = express.Router();

// GET all QR codes
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const qrs = await QRCode.find({ owner: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await QRCode.countDocuments({ owner: req.user.id });

    return response(res, 200, "QR codes retrieved successfully.", {
      qrs,
      hasMore: page * limit < total,
    });
  } catch (err) {
    console.error("Get QR Codes Error:", err);
    return response(res, 500, "Server error while retrieving QR codes.");
  }
});

// Save multiple QR codes
router.post('/', auth, async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return response(res, 400, "Request body must be a non-empty array of QR codes.");
    }
    const qrs = req.body.map((q) => ({ ...q, owner: req.user.id }));
    await QRCode.insertMany(qrs);

    return response(res, 201, "QR codes saved successfully.");
  } catch (err) {
    console.error("Save QR Codes Error:", err);
    // This can happen if a QR code is a duplicate (violates unique index)
    if (err.code === 11000) {
      return response(res, 409, "One or more QR codes are duplicates and were not saved.");
    }
    return response(res, 500, "Server error while saving QR codes.");
  }
});

// Delete all QR codes for logged user
router.delete('/', auth, async (req, res) => {
  try {
    await QRCode.deleteMany({ owner: req.user.id });
    return response(res, 200, "All QR codes have been deleted.");
  } catch (err) {
    console.error("Delete QR Codes Error:", err);
    return response(res, 500, "Server error while deleting QR codes.");
  }
});

// Update QR code status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const qr = await QRCode.findOne({ _id: req.params.id, owner: req.user.id });

    if (!qr) return response(res, 404, "QR code not found or you don't have permission to edit it.");

    qr.status = req.body.status;
    await qr.save();

    return response(res, 200, "QR code status updated.", qr);
  } catch (err) {
    console.error("Update QR Status Error:", err);
    return response(res, 500, "Server error while updating QR code status.");
  }
});

export default router;
