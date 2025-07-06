import { useNumbersForm } from "./hooks/useNumbersForm";

const App = () => {
  const { register, handleSubmit, errors, watchedValues, submittedValues } =
    useNumbersForm();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        React Hook Form + Zod: Value Transformation Approaches
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Compare Approaches:</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                1. setValueAs approach
                <input
                  type="number"
                  {...register("withSetValueAs", {
                    setValueAs: (value) => {
                      if (value === "" || value === undefined) return null;
                      const num = Number(value);
                      return Number.isNaN(num) ? null : num;
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded ${
                    errors.withSetValueAs ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter a number (0-100)"
                />
              </label>
              {errors.withSetValueAs && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.withSetValueAs.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                2. z.preprocess approach
                <input
                  type="number"
                  {...register("withPreprocess")}
                  className={`w-full px-3 py-2 border rounded ${
                    errors.withPreprocess ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter a number (0-100)"
                />
              </label>
              {errors.withPreprocess && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.withPreprocess.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="font-medium">Watched values:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-medium">Last submitted values:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(submittedValues, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
