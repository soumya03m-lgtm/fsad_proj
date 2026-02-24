import { z } from 'zod';

export const submitFeedbackResponseSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().min(2),
      value: z.any()
    })
  )
});
