import express from 'express';
import QRCode from '../models/QRCode.js';
import auth from '../middleware/auth.js';

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

    res.json({
      qrs,
      hasMore: page * limit < total
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Save multiple QR codes
router.post('/', auth, async (req, res) => {
  try {
    const qrs = req.body.map((q) => ({ ...q, owner: req.user.id }));
    await QRCode.insertMany(qrs);

    res.status(201).send('QR codes saved');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete all QR codes for logged user
router.delete('/', auth, async (req, res) => {
  try {
    await QRCode.deleteMany({ owner: req.user.id });
    res.json({ message: 'All QR codes deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update QR code status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const qr = await QRCode.findOne({ _id: req.params.id, owner: req.user.id });

    if (!qr) return res.status(404).json({ message: 'QR code not found' });

    qr.status = req.body.status;
    await qr.save();

    res.json(qr);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
