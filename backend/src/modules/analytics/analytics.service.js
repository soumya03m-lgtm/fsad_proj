import mongoose from 'mongoose';
import { FeedbackForm } from '../feedbackForms/feedbackForm.model.js';
import { FeedbackResponse } from '../feedbackResponses/feedbackResponse.model.js';
import { buildSimplePdf } from '../../shared/utils/pdf.js';
import { Course } from '../courses/course.model.js';
import { AppError } from '../../core/errors/appError.js';

function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

function ensureFormAccess(form, userId) {
  if (!form || form.createdBy.toString() !== userId) {
    throw new AppError('Access denied', {
      status: 403,
      code: 'FORM_ACCESS_DENIED'
    });
  }
}

export const analyticsService = {
  async overview(user, { courseId, semester }) {
    const formFilter = { createdBy: toObjectId(user.sub) };
    if (courseId) {
      formFilter.courseId = toObjectId(courseId);
    } else if (semester) {
      const courses = await Course.find({ adminId: user.sub, semester }).select('_id');
      formFilter.courseId = { $in: courses.map((course) => course._id) };
    }

    const forms = await FeedbackForm.find(formFilter).select('_id');
    const formIds = forms.map((form) => form._id);

    if (!formIds.length) {
      return { satisfaction: [], distribution: [], trends: [] };
    }

    const pipeline = [
      { $match: { formId: { $in: formIds } } },
      { $unwind: '$answers' },
      {
        $facet: {
          distribution: [
            { $match: { 'answers.value': { $type: 'number' } } },
            { $group: { _id: '$answers.value', count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, bucket: { $toString: '$_id' }, count: 1 } }
          ],
          trends: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' }
                },
                value: { $avg: '$answers.value' }
              }
            },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, label: '$_id', value: { $round: ['$value', 2] } } }
          ]
        }
      }
    ];

    const [result] = await FeedbackResponse.aggregate(pipeline);
    const distribution = result?.distribution || [];
    const trends = result?.trends || [];
    const totalResponses = distribution.reduce((sum, item) => sum + item.count, 0);

    const satisfaction = [
      { name: 'Excellent', value: distribution.filter((d) => Number(d.bucket) >= 4).reduce((s, d) => s + d.count, 0) },
      { name: 'Average', value: distribution.filter((d) => Number(d.bucket) === 3).reduce((s, d) => s + d.count, 0) },
      { name: 'Poor', value: distribution.filter((d) => Number(d.bucket) <= 2).reduce((s, d) => s + d.count, 0) }
    ];

    // Protect anonymity in small cohorts.
    if (totalResponses < 5) {
      return { satisfaction: [], distribution: [], trends: [], semester: semester || null, suppressed: true };
    }

    return { satisfaction, distribution, trends, semester: semester || null, suppressed: false };
  },

  async formSummary(user, formId) {
    const form = await FeedbackForm.findById(formId);
    ensureFormAccess(form, user.sub);

    const responses = await FeedbackResponse.countDocuments({ formId });
    const metrics = await FeedbackResponse.aggregate([
      { $match: { formId: toObjectId(formId) } },
      { $unwind: '$answers' },
      { $match: { 'answers.value': { $type: 'number' } } },
      { $group: { _id: null, avgRating: { $avg: '$answers.value' } } }
    ]);

    return {
      formId,
      responseCount: responses,
      avgRating: metrics[0]?.avgRating ? Number(metrics[0].avgRating.toFixed(2)) : null
    };
  },

  async trends(user, formId, from, to) {
    const form = await FeedbackForm.findById(formId);
    ensureFormAccess(form, user.sub);

    const match = { formId: toObjectId(formId) };
    if (from || to) {
      match.submittedAt = {};
      if (from) match.submittedAt.$gte = new Date(from);
      if (to) match.submittedAt.$lte = new Date(to);
    }

    return FeedbackResponse.aggregate([
      { $match: match },
      { $unwind: '$answers' },
      { $match: { 'answers.value': { $type: 'number' } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
          value: { $avg: '$answers.value' }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, label: '$_id', value: { $round: ['$value', 2] } } }
    ]);
  },

  async exportCsv(user, formId) {
    const form = await FeedbackForm.findById(formId);
    ensureFormAccess(form, user.sub);

    const responses = await FeedbackResponse.find({ formId }).select('answers submittedAt');
    const questionIds = form.questions.map((question) => question.questionId);
    const headers = ['submittedAt', ...questionIds];
    const rows = responses.map((response) => {
      const map = new Map(response.answers.map((answer) => [answer.questionId, answer.value]));
      return [
        new Date(response.submittedAt).toISOString(),
        ...questionIds.map((questionId) => {
          const value = map.get(questionId);
          if (value === undefined || value === null) return '';
          const clean = String(value).replace(/\"/g, '\"\"');
          return `\"${clean}\"`;
        })
      ];
    });

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  },

  async exportPdf(user, formId) {
    const form = await FeedbackForm.findById(formId);
    ensureFormAccess(form, user.sub);

    const summary = await this.formSummary(user, formId);
    const trends = await this.trends(user, formId);
    const lines = [
      'Student Feedback Report',
      `Form ID: ${formId}`,
      `Title: ${form.title}`,
      `Responses: ${summary.responseCount}`,
      `Average Rating: ${summary.avgRating ?? 'N/A'}`,
      ' ',
      'Trend Snapshot'
    ];

    if (!trends.length) {
      lines.push('No trend data available.');
    } else {
      trends.slice(-12).forEach((point) => {
        lines.push(`${point.label}: ${point.value}`);
      });
    }

    return buildSimplePdf(lines);
  }
};
