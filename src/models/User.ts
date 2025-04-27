// backend/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // use bcrypt to hash
  role: {
    type: String,
    enum: ['admin', 'manager', 'landlord', 'caretaker'],
    required: true,
  },
  propertyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const User = mongoose.model('User', userSchema);
export default User;
