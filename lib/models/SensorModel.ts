//lib/models/sensorModel.ts
import { z } from "zod";

export const sensorDataSchema = z.object({
  temperatura: z.number().min(-50).max(100),
  umidade: z.number().min(0).max(100),
  status: z.string(),
  regado: z.boolean(),
  gases: z.number().optional(),
  tempoDeLuz: z.number().optional(),
  timestamp: z.string().optional(),
});

export type SensorData = z.infer<typeof sensorDataSchema>;
 