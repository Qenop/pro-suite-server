import express from 'express';
import MeterReading from '../models/MeterReading';

const router = express.Router();

router.post('/', async (req, res) => {
  const { unitId, reading, timestamp } = req.body;

  if (!unitId || reading === undefined) {
    return res.status(400).json({ error: "unitId and reading are required." });
  }

  try {
    const newReading = new MeterReading({
      unitId,
      reading,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await newReading.save();
    res.status(201).json(newReading);
  } catch (err) {
    console.error("Error saving reading:", err);
    res.status(500).json({ error: "Failed to save reading." });
  }
});

export default router;
