import mongoose from 'mongoose';
import { QUESTION_TYPES } from '../../shared/enums/questionTypes.js';

const questionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: Object.values(QUESTION_TYPES), required: true },
    required: { type: Boolean, default: false },
    options: [{ type: String }],
    scale: { type: Number }
  },
  { _id: false }
);

const feedbackFormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'CLOSED'], default: 'DRAFT' },
    isAnonymous: { type: Boolean, default: true },
    verificationMode: { type: String, enum: ['NONE', 'ENROLLED_STUDENT'], default: 'ENROLLED_STUDENT' },
    questions: [questionSchema],
    publishAt: { type: Date },
    closeAt: { type: Date },
    feedbackWindowId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackWindow', default: null },
    lockAfterClose: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const FeedbackForm = mongoose.model('FeedbackForm', feedbackFormSchema);
