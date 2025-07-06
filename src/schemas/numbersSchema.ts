import { z } from "zod";

export const numbersSchema = z.object({
  withSetValueAs: z.number().min(0).max(100).nullable(),
  withPreprocess: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    const num = Number(val);
    return Number.isNaN(num) ? null : num;
  }, z.number().min(0).max(100).nullable()),
});

export type NumberFormData = z.infer<typeof numbersSchema>;
