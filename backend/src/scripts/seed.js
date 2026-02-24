import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../modules/users/user.model.js';
import { Course } from '../modules/courses/course.model.js';
import { FeedbackForm } from '../modules/feedbackForms/feedbackForm.model.js';
import { FeedbackResponse } from '../modules/feedbackResponses/feedbackResponse.model.js';

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    FeedbackForm.deleteMany({}),
    FeedbackResponse.deleteMany({})
  ]);

  const adminPassword = await bcrypt.hash('321123', 10);
  const studentPassword = await bcrypt.hash('Student@123', 10);

  const admin = await User.create({
    name: 'Soumya Mishra',
    email: 'soumya.mishra.7812@gmail.com',
    passwordHash: adminPassword,
    role: 'ADMIN'
  });

  const students = await User.insertMany([
    { name: 'Student One', email: 'student1@example.com', passwordHash: studentPassword, role: 'STUDENT' },
    { name: 'Student Two', email: 'student2@example.com', passwordHash: studentPassword, role: 'STUDENT' },
    { name: 'Student Three', email: 'student3@example.com', passwordHash: studentPassword, role: 'STUDENT' },
    { name: 'Student Four', email: 'student4@example.com', passwordHash: studentPassword, role: 'STUDENT' },
    { name: 'Student Five', email: 'student5@example.com', passwordHash: studentPassword, role: 'STUDENT' }
  ]);

  const course = await Course.create({
    code: 'CSE101',
    title: 'Introduction to Computer Science',
    semester: 'Spring 2026',
    department: 'Computer Science',
    adminId: admin._id,
    assignedStudentIds: students.map((student) => student._id)
  });

  const form = await FeedbackForm.create({
    title: 'Mid-Semester Feedback',
    description: 'Share your experience so far',
    courseId: course._id,
    createdBy: admin._id,
    status: 'PUBLISHED',
    questions: [
      { questionId: 'q1', label: 'Rate the teaching clarity', type: 'RATING', required: true },
      { questionId: 'q2', label: 'How engaging are lectures?', type: 'EMOJI', required: true },
      { questionId: 'q3', label: 'Any improvements?', type: 'TEXT', required: false }
    ]
  });

  const numericAnswers = [5, 4, 4, 3, 5];

  await FeedbackResponse.insertMany(
    students.map((student, index) => ({
      formId: form._id,
      courseId: course._id,
      studentId: student._id,
      answers: [
        { questionId: 'q1', value: numericAnswers[index] },
        { questionId: 'q2', value: numericAnswers[index] },
        { questionId: 'q3', value: `Feedback from ${student.name}` }
      ],
      submittedAt: new Date(Date.now() - (4 - index) * 86400000)
    }))
  );

  console.log('Seed completed');
  console.log('Admin login: soumya.mishra.7812@gmail.com / 321123');
  console.log('Student login: student1@example.com / Student@123');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
