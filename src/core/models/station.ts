import { z } from 'zod';

export const stationSchema = z.object({
  id: z.string().min(1), // could be updated to UUID
  description: z.string().min(1),
  name: z.string().min(1),
  imgUrl: z.url(),
  streamUrl: z.url(),
  reliability: z.number().int().min(0).max(100), // 0–100 scale
  popularity: z.number().min(0).max(5).optional(), // 0.0–5.0 float, optional
  tags: z.array(z.string().min(1)),
});

export const apiResponseSchema = z.object({
  data: z.array(stationSchema),
});

export type Station = z.infer<typeof stationSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
