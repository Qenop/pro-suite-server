import mongoose, { Schema, Document } from 'mongoose';

export interface ILease extends Document {
  propertyId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId; // Refers to a subdocument inside Property
  tenant: {
    name: string;
    phone: string;
    leaseStartDate: Date;
    rent: number;
    deposit: number;
    initialWaterReading?: number; // Optional starting water meter value
  };
  utilitiesOverride?: {
    water?: 'metered' | 'fixed' | 'free';
    electricity?: 'metered' | 'fixed' | 'free';
    garbage?: 'metered' | 'fixed' | 'free';
  };
}

const leaseSchema: Schema = new Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // `unitId` references a subdocument inside Property.units; no separate collection reference
    },
    tenant: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      leaseStartDate: { type: Date, required: true },
      rent: { type: Number, required: true },
      deposit: { type: Number, required: true },
      initialWaterReading: { type: Number }, // Optional
    },
    utilitiesOverride: {
      water: {
        type: String,
        enum: ['metered', 'fixed', 'free'],
        required: false,
      },
      electricity: {
        type: String,
        enum: ['metered', 'fixed', 'free'],
        required: false,
      },
      garbage: {
        type: String,
        enum: ['metered', 'fixed', 'free'],
        required: false,
      },
    },
  },
  { timestamps: true }
);

// Instance method to delete a lease and mark the associated unit as vacant
leaseSchema.methods.deleteLeaseAndUpdateUnitStatus = async function () {
  const lease = this;

  await mongoose.model('Property').updateOne(
    { _id: lease.propertyId, 'units._id': lease.unitId },
    { $set: { 'units.$.status': 'vacant' } }
  );

  await lease.remove();
};

export default mongoose.model<ILease>('Lease', leaseSchema);
