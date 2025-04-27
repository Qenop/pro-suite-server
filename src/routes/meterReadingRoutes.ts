import express, { Request, Response, NextFunction } from 'express';
import MeterReading from '../models/MeterReading';

const router = express.Router();

// Define the route handler as async and return Promise<void> explicitly
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { unitId, reading, timestamp } = req.body;

  if (!unitId || reading === undefined) {
    res.status(400).json({ error: "unitId and reading are required." });
    return; // Explicit return to end the function early
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
    next(err); // Pass the error to Express error handler
  }
});

export default router;
