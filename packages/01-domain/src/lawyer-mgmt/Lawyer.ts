import * as z from "zod";

export const LawyerIdSchema = z.number().int().positive();

export const AvailabilitySchema = z.object({
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const LawyerSchema = z.object({
  id: LawyerIdSchema,
  name: z.string(),
  location: z.string(),
  legalExpertise: z.array(z.string()),
  availability: z.array(AvailabilitySchema),
  price: z.number().positive(),
  affiliation: z.string(),
});

export type LawyerId = z.infer<typeof LawyerIdSchema>;
export type Availability = z.infer<typeof AvailabilitySchema>;
export type Lawyer = z.infer<typeof LawyerSchema>;
