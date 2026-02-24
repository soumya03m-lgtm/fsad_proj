import mongoose from 'mongoose';

const instructorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null, index: true },
    title: { type: String, default: '' },
    bio: { type: String, default: '' },
    specializationTags: [{ type: String, trim: true }],
    tenureStartDate: { type: Date, default: null }
  },
  { timestamps: true }
);

export const InstructorProfile = mongoose.model('InstructorProfile', instructorProfileSchema);
