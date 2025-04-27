// backend/scripts/seedBills.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Bill from '../models/Bill'; // adjust the path if needed

dotenv.config();

const seedBills = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const mockBills = [
    {
      propertyId: 'PROPERTY_ID_HERE',
      unitId: 'UNIT_ID_1',
      unitLabel: 'Unit A1',
      tenantName: 'Brian Ochieng',
      rent: 15000,
      utilities: {
        water: 1200,
        garbage: 300,
        electricity: 800,
      },
      total: 15000 + 1200 + 300 + 800,
      period: '2025-04',
      status: 'unpaid',
    },
    {
      propertyId: 'PROPERTY_ID_HERE',
      unitId: 'UNIT_ID_2',
      unitLabel: 'Unit B2',
      tenantName: 'Mary Ciku',
      rent: 14000,
      utilities: {
        water: 900,
        garbage: 300,
        electricity: 750,
      },
      total: 14000 + 900 + 300 + 750,
      period: '2025-04',
      status: 'paid',
    },
  ];

  await Bill.deleteMany({ period: '2025-04' }); // optional: clear old data
  await Bill.insertMany(mockBills);

  console.log('✅ Mock bills inserted');
  process.exit();
};

seedBills().catch((err) => {
  console.error(err);
  process.exit(1);
});
