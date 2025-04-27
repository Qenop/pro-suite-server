import express from 'express';
import Bill from '../models/Bill';

const router = express.Router();

// POST /api/bills - create a bill
router.post('/', async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bill', error });
  }
});

// GET /api/bills?propertyId=xxx&month=2025-04
router.get('/', async (req, res) => {
  try {
    const { propertyId, month } = req.query;
    const query: any = {};
    if (propertyId) query.propertyId = propertyId;
    if (month) query.billingMonth = month;

    const bills = await Bill.find(query);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bills', error });
  }
});

export default router;
