import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type NumberFormData, numbersSchema } from "../schemas/numbersSchema";

export const useNumbersForm = () => {
  const [submittedValues, setSubmittedValues] = useState<NumberFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(numbersSchema),
    mode: "onChange",
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
