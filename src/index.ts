import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import propertyRoutes from './routes/propertyRoutes';
import leaseRoutes from './routes/leaseRoutes';
import tenantRoutes from './routes/tenantRoutes';
import meterReadingRoutes from './routes/meterReadingRoutes';
import billRoutes from './routes/billRoutes';

//Debugging log 
//console.log("🚧 meterReadingRoutes import:", meterReadingRoutes);
//console.log("propertyRoutes import:", propertyRoutes);
//console.log("leaseRoutes import:", leaseRoutes);
//console.log("tenantRoutes import:", tenantRoutes);
//console.log("meterReadingRoutes import:", meterReadingRoutes);

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI not defined in environment variables.');
}

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json());

// === API Routes ===
app.use('/api/properties', propertyRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/meter-readings', meterReadingRoutes);
app.use('/api/bills', billRoutes);

// === MongoDB Connection ===
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
      console.log(`📡 API Endpoints:`);
      console.log(`   • Properties → http://localhost:${PORT}/api/properties`);
      console.log(`   • Leases     → http://localhost:${PORT}/api/leases`);
      console.log(`   • Tenants    → POST/GET/DELETE via /api/tenants (implemented inside leases)`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
