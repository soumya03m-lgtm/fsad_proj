import { z } from 'zod';
import { QUESTION_TYPES } from '../../shared/enums/questionTypes.js';

const questionSchema = z.object({
  questionId: z.string().min(2),
  label: z.string().min(1),
  type: z.nativeEnum(QUESTION_TYPES),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  scale: z.number().optional()
});

export const createFeedbackFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  courseId: z.string().min(5),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']).optional(),
  questions: z.array(questionSchema).min(1)
});

export const updateFeedbackFormSchema = createFeedbackFormSchema.partial();
