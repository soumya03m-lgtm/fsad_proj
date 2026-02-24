import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, index: true },
    title: { type: String, required: true },
    semester: { type: String, required: true, index: true },
    department: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null, index: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    instructorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assignedStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
