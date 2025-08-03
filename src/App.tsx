import { useNumbersForm } from "./hooks/useNumbersForm";

const App = () => {
  const { register, handleSubmit, errors, watchedValues, submittedValues } =
    useNumbersForm();

  return (
    <div className="mx-auto max-w-2xl p-8 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold">
        React Hook Form + Zod: Value Transformation Approaches
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Compare Approaches:</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                1. setValueAs approach ("withSetValueAs" field)
                <input
                  type="number"
                  {...register("withSetValueAs", {
                    setValueAs: (value) => {
                      if (value === "" || value === undefined) return null;
                      const num = Number(value);
                      return Number.isNaN(num) ? null : num;
                    },
                  })}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.withSetValueAs ? "border-red-500" : "border-gray-300"
                  }`}
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
              <label className="mb-1 block text-sm font-medium">
                2. z.preprocess approach ("withPreprocess" field)
                <input
                  type="number"
                  {...register("withPreprocess")}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.withPreprocess ? "border-red-500" : "border-gray-300"
                  }`}
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
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <div>
          <h3 className="font-medium">Watched values:</h3>
          <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm">
            {JSON.stringify(watchedValues, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-medium">Last submitted values:</h3>
          <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm">
            {JSON.stringify(submittedValues, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
