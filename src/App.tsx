import { useNumberInputsForm } from "./hooks/useNumberInputsForm";

const App = () => {
  const {
    register,
    handleSubmit,
    errors,
    watchedValues,
    submittedValues,
  } = useNumberInputsForm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Number Input Demo
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="withSetValueAs"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter a number (0-100) - setValueAs approach
            </label>
            <input
              id="withSetValueAs"
              type="number"
              {...register("withSetValueAs", {
                setValueAs: (value) => {
                  if (value === "" || value === undefined) return null;
                  const num = Number(value);
                  return Number.isNaN(num) ? null : num;
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a number"
            />
            {errors.withSetValueAs && (
              <p className="mt-1 text-sm text-red-600">
                {errors.withSetValueAs.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="withPreprocess"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter a number (0-100) - z.preprocess approach
            </label>
            <input
              id="withPreprocess"
              type="number"
              {...register("withPreprocess")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter a number"
            />
            {errors.withPreprocess && (
              <p className="mt-1 text-sm text-red-600">
                {errors.withPreprocess.message}
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

        <div className="mt-6 space-y-3 border-t pt-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Current watched values:</span>{" "}
            <pre className="font-mono text-blue-600">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Last submitted values:</span>{" "}
            <pre className="font-mono text-green-600">
              {JSON.stringify(submittedValues, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
