import express from 'express';
import Tenant from '../models/Tenant';
import Property from '../models/Property';

const router = express.Router();

// GET /api/tenants - Fetch all tenants with property/unit names
router.get('/', async (_req, res) => {
  try {
    const tenants = await Tenant.find().sort({ createdAt: -1 }).lean();

    const tenantsWithDetails = await Promise.all(
      tenants.map(async (tenant) => {
        const property = await Property.findById(tenant.propertyId).lean();

        let unitName = '';
        if (property && Array.isArray(property.units)) {
          const unit = property.units.find(
            (u: any) => u?._id?.toString() === tenant.unitId.toString()
          );
          unitName = (unit as { name?: string })?.name || '';

        }

        return {
          ...tenant,
          propertyName: property?.name || tenant.propertyId,
          unitName: unitName || tenant.unitId,
        };
      })
    );

    res.status(200).json(tenantsWithDetails);
  } catch (err) {
    console.error('Failed to fetch tenants:', err);
    res.status(500).json({ message: 'Error fetching tenants' });
  }
});

export default router;
