const MOCK_USERS_KEY = 'mock_users';
const DEMO_COURSES_KEY = 'demo_courses';
const DEMO_FORMS_KEY = 'demo_forms';
const DEMO_RESPONSES_KEY = 'demo_responses';

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function readJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '');
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  return readJson('user', null);
}

function getUsers() {
  return readJson(MOCK_USERS_KEY, []);
}

function getCourses() {
  const existing = readJson(DEMO_COURSES_KEY, []);
  if (existing.length) return existing;

  const seeded = [
    { _id: 'course_1', code: 'CSE101', title: 'Intro to Programming', semester: 'Sem 1', department: 'CSE', assignedStudentIds: [] },
    { _id: 'course_2', code: 'MAT201', title: 'Discrete Mathematics', semester: 'Sem 2', department: 'Mathematics', assignedStudentIds: [] }
  ];
  writeJson(DEMO_COURSES_KEY, seeded);
  return seeded;
}

function saveCourses(courses) {
  writeJson(DEMO_COURSES_KEY, courses);
}

function getForms() {
  const existing = readJson(DEMO_FORMS_KEY, []);
  if (existing.length) return existing;

  const courses = getCourses();
  const seeded = [
    {
      _id: 'form_1',
      title: 'Mid-Sem Teaching Feedback',
      description: 'Share feedback about pace, clarity, and support.',
      courseId: courses[0]?._id || '',
      status: 'PUBLISHED',
      questions: [
        { questionId: 'q1', label: 'How clear were the lectures?', type: 'RATING' },
        { questionId: 'q2', label: 'How would you rate assignment quality?', type: 'RATING' }
      ]
    }
  ];
  writeJson(DEMO_FORMS_KEY, seeded);
  return seeded;
}

function saveForms(forms) {
  writeJson(DEMO_FORMS_KEY, forms);
}

function getResponses() {
  return readJson(DEMO_RESPONSES_KEY, []);
}

function saveResponses(responses) {
  writeJson(DEMO_RESPONSES_KEY, responses);
}

function toBucket(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function scoreResponse(response) {
  const values = (response.answers || []).map((entry) => toBucket(entry?.value)).filter(Boolean);
  if (!values.length) return 4;
  return values.reduce((sum, item) => sum + item, 0) / values.length;
}

function distributionFor(responses) {
  const counts = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0]
  ]);
  responses.forEach((response) => {
    const bucket = toBucket(scoreResponse(response));
    counts.set(bucket, (counts.get(bucket) || 0) + 1);
  });
  return Array.from(counts.entries()).map(([bucket, count]) => ({ bucket: String(bucket), count }));
}

function satisfactionFor(responses) {
  let positive = 0;
  let neutral = 0;
  let negative = 0;

  responses.forEach((response) => {
    const score = scoreResponse(response);
    if (score >= 4) positive += 1;
    else if (score >= 3) neutral += 1;
    else negative += 1;
  });

  return [
    { name: 'Positive', value: positive },
    { name: 'Neutral', value: neutral },
    { name: 'Negative', value: negative }
  ];
}

function trendsFor(responses) {
  const byMonth = new Map();
  responses.forEach((response) => {
    const date = new Date(response.submittedAt || Date.now());
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const list = byMonth.get(key) || [];
    list.push(scoreResponse(response));
    byMonth.set(key, list);
  });

  return Array.from(byMonth.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([month, scores]) => ({
      label: month,
      value: Number((scores.reduce((sum, value) => sum + value, 0) / scores.length).toFixed(2))
    }));
}

export const demoData = {
  listCourses() {
    return getCourses();
  },

  createCourse(payload) {
    const next = {
      _id: uid('course'),
      code: payload.code,
      title: payload.title,
      semester: payload.semester,
      department: payload.department,
      assignedStudentIds: []
    };
    const updated = [...getCourses(), next];
    saveCourses(updated);
    return next;
  },

  assignStudents(courseId, studentIds) {
    const updated = getCourses().map((course) => (course._id === courseId ? { ...course, assignedStudentIds: studentIds } : course));
    saveCourses(updated);
    return updated.find((course) => course._id === courseId) || null;
  },

  listForms() {
    return getForms();
  },

  createForm(payload) {
    const next = {
      _id: uid('form'),
      ...payload
    };
    const updated = [...getForms(), next];
    saveForms(updated);
    return next;
  },

  publishForm(formId) {
    const updated = getForms().map((form) => (form._id === formId ? { ...form, status: 'PUBLISHED' } : form));
    saveForms(updated);
    return updated.find((form) => form._id === formId) || null;
  },

  closeForm(formId) {
    const updated = getForms().map((form) => (form._id === formId ? { ...form, status: 'CLOSED' } : form));
    saveForms(updated);
    return updated.find((form) => form._id === formId) || null;
  },

  getFormById(formId) {
    return getForms().find((form) => form._id === formId) || null;
  },

  submitResponse(formId, payload) {
    const user = getCurrentUser();
    const email = user?.email || 'demo@student.com';
    const existing = getResponses();
    const filtered = existing.filter((item) => !(item.formId === formId && item.userEmail === email));
    const next = {
      _id: uid('resp'),
      formId,
      userEmail: email,
      answers: payload.answers || [],
      submittedAt: new Date().toISOString()
    };
    const updated = [...filtered, next];
    saveResponses(updated);
    return next;
  },

  myStatuses() {
    const user = getCurrentUser();
    const email = user?.email;
    if (!email) return [];
    return getResponses()
      .filter((item) => item.userEmail === email)
      .map((item) => ({ formId: item.formId, submittedAt: item.submittedAt }));
  },

  listResponsesForForm(formId) {
    return getResponses().filter((item) => item.formId === formId);
  },

  insights(formId) {
    const responses = this.listResponsesForForm(formId);
    const suppressed = responses.length < 5;
    return {
      suppressed,
      satisfaction: suppressed ? [] : satisfactionFor(responses),
      distribution: suppressed ? [] : distributionFor(responses)
    };
  },

  overview(params = {}) {
    const forms = getForms();
    const formIds = forms.filter((form) => !params.courseId || form.courseId === params.courseId).map((form) => form._id);
    const responses = getResponses().filter((item) => formIds.includes(item.formId));
    const suppressed = responses.length < 5;
    return {
      suppressed,
      satisfaction: suppressed ? [] : satisfactionFor(responses),
      distribution: suppressed ? [] : distributionFor(responses),
      trends: suppressed ? [] : trendsFor(responses)
    };
  },

  summary(formId) {
    const responses = this.listResponsesForForm(formId);
    const count = responses.length;
    if (!count) return { responseCount: 0, avgRating: null };
    const avgRating = (responses.reduce((sum, response) => sum + scoreResponse(response), 0) / count).toFixed(2);
    return { responseCount: count, avgRating };
  },

  listStudents() {
    const students = getUsers()
      .filter((user) => String(user.role || '').toLowerCase() === 'student')
      .map((student) => ({
        _id: student.email,
        name: student.name,
        email: student.email
      }));
    return students;
  },

  me() {
    const user = getCurrentUser();
    if (!user) return null;
    return {
      ...user,
      departmentId: user.departmentId || ''
    };
  },

  updateMe(payload) {
    const current = this.me();
    if (!current) return null;
    const updated = { ...current, ...payload };
    localStorage.setItem('user', JSON.stringify(updated));
    return updated;
  }
};
