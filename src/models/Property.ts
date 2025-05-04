import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUtility {
  billing?: string;
  amount?: string;
  costPerUnit?: string;
}

interface IUnit {
  _id?: Types.ObjectId; // Explicitly track the _id
  type: string;
  rent: string;
  deposit: string;
  unitNumber: string;
}

export interface IProperty extends Document {
  name: string;
  address: string;
  type: string;
  utilities: {
    water: IUtility;
    electricity: IUtility;
    garbage: { amount: string };
  };
  serviceRate: {
    type: string;
    value: string;
  };
  paymentAccount: string;
  /*paymentAccount: {
    accountName: { type: String, required: true },
    bankName:    { type: String, required: true },
    accountNumber: { type: String, required: true },
  },*/
  
  landlord: { name: string; phone: string; email:string };
  caretaker: { name: string; phone: string; email:string};
  units: IUnit[];
}

const UnitSchema: Schema = new Schema({
  type: { type: String, required: true },
  rent: String,
  deposit: String,
  unitNumber: String,
  status: {
    type: String,
    enum: ['vacant', 'occupied'],
    default: 'vacant',
  },
}, { _id: true }); // Ensure _id is present for each unit

const PropertySchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },
  utilities: {
    water: {
      billing: String,
      amount: String,
      costPerUnit: String,
    },
    electricity: {
      billing: String,
      amount: String,
      costPerUnit: String,
    },
    garbage: {
      amount: String,
    },
  },
  serviceRate: {
    type: {
      type: String,
    },
    value: String,
  },
  paymentAccount: String,
  landlord: {
    name: String,
    phone: String,
  },
  caretaker: {
    name: String,
    phone: String,
  },
  units: [UnitSchema],
});

export default mongoose.model<IProperty>('Property', PropertySchema);
