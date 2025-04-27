import express from 'express';
import Lease from '../models/Lease';
import Property from '../models/Property';

const router = express.Router();

// Create a new lease
router.post('/', async (req, res) => {
  try {
    const {
      tenant: {
        name,
        phone,
        leaseStartDate,
        rent,
        deposit,
        initialWaterReading, // ✅ use correct field name
      },
      propertyId,
      unitId,
      utilitiesOverride,
    } = req.body;

    // Create a new lease
    const newLease = new Lease({
      tenant: {
        name,
        phone,
        leaseStartDate,
        rent,
        deposit,
        initialWaterReading,
      },
      propertyId,
      unitId,
      utilitiesOverride,
    });

    // Save the lease
    const savedLease = await newLease.save();

    // Update the unit status to "occupied"
    await Property.updateOne(
      { _id: propertyId, 'units._id': unitId },
      { $set: { 'units.$.status': 'occupied' } }
    );

    res.status(201).json(savedLease);
  } catch (err) {
    console.error('Error creating lease:', err);
    res.status(500).json({ message: 'Failed to create lease' });
  }
});

// Get all leases with property and unit details
router.get('/', async (_req, res) => {
  try {
    const leases = await Lease.find().sort({ createdAt: -1 }).lean();

    const leasesWithDetails = await Promise.all(
      leases.map(async (lease) => {
        const property = await Property.findById(lease.propertyId).lean();

        if (!property) return lease;

        const unit = property.units?.find(
          (u) => u?._id?.toString() === lease.unitId?.toString()
        );

        return {
          ...lease,
          property: {
            _id: property._id,
            name: property.name,
            address: property.address,
            type: property.type,
          },
          unitDetails: unit || null,
        };
      })
    );

    res.status(200).json(leasesWithDetails);
  } catch (err) {
    console.error('Error fetching leases:', err);
    res.status(500).json({ message: 'Failed to fetch leases' });
  }
});

export default router;
