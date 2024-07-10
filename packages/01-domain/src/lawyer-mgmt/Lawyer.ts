import * as z from "zod";

export const LawyerIdSchema = z.string().uuid();

export const LawyerSchema = z.object({
  id: LawyerIdSchema,
  fullName: z.string(),
});

export type LawyerId = z.infer<typeof LawyerIdSchema>;
export type Lawyer = z.infer<typeof LawyerSchema>;
