import mongoose, { Document, Schema } from 'mongoose';

interface ITenant extends Document {
  name: string;
  phone: string;
  leaseStartDate: Date;
  rent: number;
  deposit: number;
  unitId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  initialWaterReading?: number;
}

const TenantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    leaseStartDate: { type: Date, required: true },
    rent: { type: Number, required: true },
    deposit: { type: Number, required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    initialWaterReading: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITenant>('Tenant', TenantSchema);
