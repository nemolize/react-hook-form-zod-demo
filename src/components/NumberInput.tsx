import { twMerge } from "tailwind-merge";

interface NumberInputProps {
  label: string;
  className?: string;
  placeholder?: string;
  error?: string;
}

export const NumberInput = ({
  label,
  className,
  placeholder,
  error,
  ...props
}: NumberInputProps) => {
  return (
    <label className="block">
      <div>{label}</div>
      <input
        type="number"
        className={twMerge(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
          className,
        )}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
};
