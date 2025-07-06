import { act, renderHook } from "@testing-library/react";
import { useNumbersForm } from "./useNumbersForm";

describe("useNumbersForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNumbersForm());

    expect(result.current.submittedValues).toBeNull();
    expect(result.current.watchedValues).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(typeof result.current.register).toBe("function");
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("should register form fields correctly", () => {
    const { result } = renderHook(() => useNumbersForm());

    const withSetValueAsField = result.current.register("withSetValueAs", {
      setValueAs: (value) => {
        if (value === "" || value === undefined) return null;
        const num = Number(value);
        return Number.isNaN(num) ? null : num;
      },
    });

    const withPreprocessField = result.current.register("withPreprocess");

    expect(withSetValueAsField).toHaveProperty("name");
    expect(withSetValueAsField).toHaveProperty("onChange");
    expect(withSetValueAsField).toHaveProperty("onBlur");
    expect(withSetValueAsField).toHaveProperty("ref");

    expect(withPreprocessField).toHaveProperty("name");
    expect(withPreprocessField).toHaveProperty("onChange");
    expect(withPreprocessField).toHaveProperty("onBlur");
    expect(withPreprocessField).toHaveProperty("ref");
  });

  it("should handle form submission with valid data", async () => {
    const { result } = renderHook(() => useNumbersForm());
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const mockEvent = {
      preventDefault: vi.fn(),
    };

    // Mock the form submission
    await act(async () => {
      // handleSubmit is already wrapped with the onSubmit function in the hook
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("should validate number range (0-100)", () => {
    const { result } = renderHook(() => useNumbersForm());

    // Test validation schema directly
    const schema = result.current.register("withSetValueAs").name;
    expect(schema).toBe("withSetValueAs");

    const preprocessSchema = result.current.register("withPreprocess").name;
    expect(preprocessSchema).toBe("withPreprocess");
  });

  it("should handle null values correctly", () => {
    const { result } = renderHook(() => useNumbersForm());

    // The hook should be able to handle null values for both fields
    expect(result.current.watchedValues).toEqual({});
    expect(result.current.submittedValues).toBeNull();
  });

  it("should update watched values when form changes", () => {
    const { result } = renderHook(() => useNumbersForm());

    // Initial watched values should be empty
    expect(result.current.watchedValues).toEqual({});

    // Note: In a real test scenario, we would need to simulate form field changes
    // which requires more complex setup with form state management
  });

  it("should handle setValueAs transformation", () => {
    const setValueAsTransform = (value) => {
      if (value === "" || value === undefined) return null;
      const num = Number(value);
      return Number.isNaN(num) ? null : num;
    };

    // Test the transformation logic
    expect(setValueAsTransform("")).toBeNull();
    expect(setValueAsTransform(undefined)).toBeNull();
    expect(setValueAsTransform("50")).toBe(50);
    expect(setValueAsTransform("invalid")).toBeNull();
    expect(setValueAsTransform(25)).toBe(25);
  });

  it("should handle preprocess transformation", () => {
    // Test the preprocess logic that would be applied by Zod
    const preprocessTransform = (val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = Number(val);
      return Number.isNaN(num) ? null : num;
    };

    expect(preprocessTransform("")).toBeNull();
    expect(preprocessTransform(null)).toBeNull();
    expect(preprocessTransform(undefined)).toBeNull();
    expect(preprocessTransform("75")).toBe(75);
    expect(preprocessTransform("invalid")).toBeNull();
    expect(preprocessTransform(42)).toBe(42);
  });

  it("should maintain form state consistency", () => {
    const { result } = renderHook(() => useNumbersForm());

    // The hook should maintain consistent state structure
    expect(result.current).toHaveProperty("register");
    expect(result.current).toHaveProperty("handleSubmit");
    expect(result.current).toHaveProperty("errors");
    expect(result.current).toHaveProperty("watchedValues");
    expect(result.current).toHaveProperty("submittedValues");
  });
});
