import mongoose from 'mongoose';

const feedbackWindowSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    semester: { type: String, required: true, index: true },
    opensAt: { type: Date, required: true },
    closesAt: { type: Date, required: true },
    lockSubmissionsAfterClose: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

feedbackWindowSchema.index({ courseId: 1, semester: 1 }, { unique: true });

export const FeedbackWindow = mongoose.model('FeedbackWindow', feedbackWindowSchema);
