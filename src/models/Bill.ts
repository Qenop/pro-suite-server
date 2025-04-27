import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    billingMonth: { type: String, required: true }, // e.g. '2025-04'
    rentAmount: { type: Number, required: true },
    deposit: { type: Number, required: false },
    waterCharge: { type: Number, default: 0 },
    garbageCharge: { type: Number, default: 0 },
    electricityCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  },
  { timestamps: true }
);

export default mongoose.model('Bill', billSchema);
