import { FeedbackResponse } from './feedbackResponse.model.js';
import { FeedbackForm } from '../feedbackForms/feedbackForm.model.js';
import { Course } from '../courses/course.model.js';

export const feedbackResponseService = {
  async submit(user, formId, payload) {
    const form = await FeedbackForm.findById(formId);
    if (!form || form.status !== 'PUBLISHED') {
      const err = new Error('Form not available');
      err.status = 404;
      err.code = 'FORM_NOT_AVAILABLE';
      throw err;
    }

    const course = await Course.findById(form.courseId);
    if (!course || !course.assignedStudentIds.some((id) => id.toString() === user.sub)) {
      const err = new Error('Course access denied');
      err.status = 403;
      err.code = 'COURSE_ACCESS_DENIED';
      throw err;
    }

    const response = await FeedbackResponse.findOneAndUpdate(
      { formId, studentId: user.sub },
      {
        formId,
        courseId: form.courseId,
        studentId: user.sub,
        answers: payload.answers,
        submittedAt: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return response;
  },

  async listForForm(user, formId) {
    const form = await FeedbackForm.findById(formId);
    if (!form || form.createdBy.toString() !== user.sub) {
      const err = new Error('Access denied');
      err.status = 403;
      err.code = 'FORM_ACCESS_DENIED';
      throw err;
    }

    const responses = await FeedbackResponse.find({ formId }).select('answers submittedAt');
    return responses;
  },

  async myStatuses(user) {
    const submissions = await FeedbackResponse.find({ studentId: user.sub }).select('formId submittedAt');
    return submissions;
  },

  async insightsForStudent(user, formId) {
    const form = await FeedbackForm.findById(formId);
    if (!form || form.status !== 'PUBLISHED') {
      const err = new Error('Form not available');
      err.status = 404;
      err.code = 'FORM_NOT_AVAILABLE';
      throw err;
    }

    const submitted = await FeedbackResponse.findOne({ formId, studentId: user.sub }).select('_id');
    if (!submitted) {
      const err = new Error('Submit feedback before viewing insights');
      err.status = 403;
      err.code = 'INSIGHTS_LOCKED';
      throw err;
    }

    const distributionRaw = await FeedbackResponse.aggregate([
      { $match: { formId: form._id } },
      { $unwind: '$answers' },
      { $match: { 'answers.value': { $type: 'number' } } },
      { $group: { _id: '$answers.value', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, bucket: { $toString: '$_id' }, count: 1 } }
    ]);

    const total = distributionRaw.reduce((sum, item) => sum + item.count, 0);
    if (total < 5) {
      return { satisfaction: [], distribution: [], suppressed: true };
    }

    const satisfaction = [
      { name: 'Excellent', value: distributionRaw.filter((d) => Number(d.bucket) >= 4).reduce((s, d) => s + d.count, 0) },
      { name: 'Average', value: distributionRaw.filter((d) => Number(d.bucket) === 3).reduce((s, d) => s + d.count, 0) },
      { name: 'Poor', value: distributionRaw.filter((d) => Number(d.bucket) <= 2).reduce((s, d) => s + d.count, 0) }
    ];

    return { satisfaction, distribution: distributionRaw, suppressed: false };
  }
};
