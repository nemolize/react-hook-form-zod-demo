import { NumberInput } from "./components/NumberInput";
import { useNumbersForm } from "./hooks/useNumbersForm";

const App = () => {
  const { register, handleSubmit, errors, watchedValues, submittedValues } =
    useNumbersForm();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="bg-white p-8 rounded-lg shadow-lg">
        <header>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            React Hook Form + Zod Validation
          </h1>
          <p className="text-gray-600 mb-6">
            Compare value transformation & validation approaches
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <section
            className="space-y-4"
            aria-label="Value Transformation Methods"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Value Transformation Methods
            </h2>

            <NumberInput
              label="setValueAs approach"
              {...register("withSetValueAs", {
                setValueAs: (value) => {
                  if (value === "" || value === undefined) return null;
                  const num = Number(value);
                  return Number.isNaN(num) ? null : num;
                },
              })}
              placeholder="Enter a number (0-100)"
              error={errors.withSetValueAs?.message}
            />

            <NumberInput
              label="z.preprocess approach"
              {...register("withPreprocess")}
              placeholder="Enter a number (0-100)"
              error={errors.withPreprocess?.message}
            />
          </section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>

        <section
          className="mt-6 space-y-3 border-t pt-4"
          aria-label="Form Data Display"
        >
          <section
            className="text-sm text-gray-600"
            aria-label="Current watched values"
          >
            <span className="font-medium">Current watched values:</span>{" "}
            <pre
              className="font-mono text-blue-600 bg-gray-200 p-4 rounded"
              role="log"
              aria-live="polite"
            >
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </section>
          <section
            className="text-sm text-gray-600"
            aria-label="Last submitted values"
          >
            <span className="font-medium">Last submitted values:</span>{" "}
            <pre
              className="font-mono text-green-600 bg-gray-200 p-4 rounded"
              role="log"
            >
              {JSON.stringify(submittedValues, null, 2)}
            </pre>
          </section>
        </section>
      </main>
    </div>
  );
};

export default App;
