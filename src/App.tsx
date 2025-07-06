import { twMerge } from "tailwind-merge";
import { useNumbersForm } from "./hooks/useNumbersForm";

const App = () => {
  const { register, handleSubmit, errors, watchedValues, submittedValues } =
    useNumbersForm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          React Hook Form + Zod Validation
        </h1>
        <p className="text-gray-600 mb-6">
          Compare value transformation & validation approaches
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Value Transformation Methods
            </h2>

            <div>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  setValueAs approach
                </span>
                <input
                  type="number"
                  {...register("withSetValueAs", {
                    setValueAs: (value) => {
                      if (value === "" || value === undefined) return null;
                      const num = Number(value);
                      return Number.isNaN(num) ? null : num;
                    },
                  })}
                  className={twMerge(
                    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none",
                    errors.withSetValueAs
                      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  )}
                  placeholder="Enter a number (0-100)"
                />
            </label>
            {errors.withSetValueAs && (
              <p className="mt-1 text-sm text-red-600">
                {errors.withSetValueAs.message}
              </p>
            )}
          </div>

          <div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                z.preprocess approach
              </span>
              <input
                type="number"
                {...register("withPreprocess")}
                className={twMerge(
                  "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none",
                  errors.withPreprocess
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                    : "border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                )}
                placeholder="Enter a number (0-100)"
              />
            </label>
            {errors.withPreprocess && (
              <p className="mt-1 text-sm text-red-600">
                {errors.withPreprocess.message}
              </p>
            )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 space-y-3 border-t pt-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Current watched values:</span>{" "}
            <pre className="font-mono text-blue-600 bg-gray-200 p-4 rounded">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Last submitted values:</span>{" "}
            <pre className="font-mono text-green-600 bg-gray-200 p-4 rounded">
              {JSON.stringify(submittedValues, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
