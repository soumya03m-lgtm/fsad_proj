import mongoose from 'mongoose';

const baseFields = {
  semester: { type: String, required: true, index: true },
  generatedAt: { type: Date, default: Date.now, index: true },
  metrics: {
    avgSatisfaction: { type: Number, default: null },
    responseRate: { type: Number, default: null },
    improvementScore: { type: Number, default: null },
    participationRate: { type: Number, default: null }
  },
  sentiment: {
    positive: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    negative: { type: Number, default: 0 }
  },
  recurringKeywords: [{ type: String }]
};

const courseAnalyticsSnapshotSchema = new mongoose.Schema(
  {
    ...baseFields,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true }
  },
  { timestamps: true, collection: 'course_analytics_snapshots' }
);

courseAnalyticsSnapshotSchema.index({ courseId: 1, semester: 1 }, { unique: true });

const instructorAnalyticsSnapshotSchema = new mongoose.Schema(
  {
    ...baseFields,
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true, collection: 'instructor_analytics_snapshots' }
);

instructorAnalyticsSnapshotSchema.index({ instructorId: 1, semester: 1 }, { unique: true });

const departmentAnalyticsSnapshotSchema = new mongoose.Schema(
  {
    ...baseFields,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, index: true }
  },
  { timestamps: true, collection: 'department_analytics_snapshots' }
);

departmentAnalyticsSnapshotSchema.index({ departmentId: 1, semester: 1 }, { unique: true });

export const CourseAnalyticsSnapshot = mongoose.model('CourseAnalyticsSnapshot', courseAnalyticsSnapshotSchema);
export const InstructorAnalyticsSnapshot = mongoose.model('InstructorAnalyticsSnapshot', instructorAnalyticsSnapshotSchema);
export const DepartmentAnalyticsSnapshot = mongoose.model('DepartmentAnalyticsSnapshot', departmentAnalyticsSnapshotSchema);
