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
    watch,
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(numbersSchema),
    mode: "onChange",
  });

  const watchedValues = watch();

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form submitted with:", data);
    setSubmittedValues(data);
  });

  return {
    register,
    handleSubmit,
    errors,
    watchedValues,
    submittedValues,
  };
};
