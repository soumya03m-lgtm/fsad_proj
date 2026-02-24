import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed }
  },
  { _id: false }
);

const feedbackResponseSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackForm', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    answers: [answerSchema],
    submittedAt: { type: Date, default: Date.now },
    submissionStatus: { type: String, enum: ['SUBMITTED', 'LOCKED', 'EDITED'], default: 'SUBMITTED' },
    submittedWithinWindow: { type: Boolean, default: true },
    editedUntil: { type: Date, default: null },
    lastEditedAt: { type: Date, default: null },
    sentimentScore: { type: Number, default: null },
    recurringKeywords: [{ type: String }]
  },
  { timestamps: true }
);

feedbackResponseSchema.index({ formId: 1, studentId: 1 }, { unique: true });

export const FeedbackResponse = mongoose.model('FeedbackResponse', feedbackResponseSchema);
