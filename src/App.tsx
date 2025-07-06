import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const numberSchema = z.object({
  numberInput: z.number().min(0).max(100),
});

type NumberFormData = z.infer<typeof numberSchema>;

const App = () => {
  const [submittedValue, setSubmittedValue] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NumberFormData>({
    resolver: zodResolver(numberSchema),
  });

  const watchedValue = watch("numberInput");

  const onSubmit = (data: NumberFormData) => {
    console.log("Form submitted with:", data);
    setSubmittedValue(data.numberInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Number Input Demo
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="numberInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter a number (0-100)
            </label>
            <input
              id="numberInput"
              type="number"
              {...register("numberInput", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a number"
            />
            {errors.numberInput && (
              <p className="mt-1 text-sm text-red-600">
                {errors.numberInput.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Current value (watched):</span>{" "}
            <span className="font-mono text-blue-600">
              {watchedValue !== undefined ? JSON.stringify(watchedValue) : "undefined"}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Last submitted value:</span>{" "}
            <span className="font-mono text-green-600">
              {submittedValue !== null ? submittedValue : "none"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
