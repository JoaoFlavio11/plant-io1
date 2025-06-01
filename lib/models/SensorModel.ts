// src/lib/models/sensorModel.ts
import { z } from 'zod';

// Schema para envio (POST)
export const sensorDataSchema = z.object({
  temperatura: z.number(),
  umidade: z.number(),
  qtdcooler: z.number(),
  qtdbomba1: z.number(),
  qtdbomba2: z.number(),
  solo1: z.number(),
  solo2: z.number(),
});

// Schema completo (inclui timestamp)
export const sensorDataWithTimestampSchema = sensorDataSchema.extend({
  timestamp: z.string(),
});

export type SensorData = z.infer<typeof sensorDataWithTimestampSchema>;
export type SensorPostData = z.infer<typeof sensorDataSchema>;
