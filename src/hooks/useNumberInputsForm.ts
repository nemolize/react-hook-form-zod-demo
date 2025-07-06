import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const numberSchema = z.object({
  withSetValueAs: z.union([z.number().min(0).max(100), z.null()]),
  withPreprocess: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = Number(val);
      return Number.isNaN(num) ? null : num;
    },
    z.union([z.number().min(0).max(100), z.null()]),
  ),
});

type NumberFormData = z.infer<typeof numberSchema>;

export const useNumberInputsForm = () => {
  const [submittedValues, setSubmittedValues] = useState<NumberFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(numberSchema),
  });

  const watchedValues = watch();

  const onSubmit = (data: unknown) => {
    console.log("Form submitted with:", data);
    setSubmittedValues(data as NumberFormData);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    watchedValues,
    submittedValues,
  };
};

export type { NumberFormData };
