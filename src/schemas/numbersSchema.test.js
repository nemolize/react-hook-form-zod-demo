import { describe, expect, it } from "vitest";

import { numbersSchema } from "./numbersSchema";

describe("numbersSchema", () => {
  describe("withSetValueAs field", () => {
    it("should accept valid numbers within range", () => {
      const validData = { withSetValueAs: 50, withPreprocess: 75 };
      const result = numbersSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it("should accept null values", () => {
      const dataWithNull = { withSetValueAs: null, withPreprocess: null };
      const result = numbersSchema.safeParse(dataWithNull);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(dataWithNull);
    });

    it("should accept boundary values (0 and 100)", () => {
      const minBoundary = { withSetValueAs: 0, withPreprocess: 0 };
      const maxBoundary = { withSetValueAs: 100, withPreprocess: 100 };

      expect(numbersSchema.safeParse(minBoundary).success).toBe(true);
      expect(numbersSchema.safeParse(maxBoundary).success).toBe(true);
    });

    it("should reject numbers below 0", () => {
      const invalidData = { withSetValueAs: -1, withPreprocess: 50 };
      const result = numbersSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toContain(
        "Too small: expected number to be >=0",
      );
    });

    it("should reject numbers above 100", () => {
      const invalidData = { withSetValueAs: 101, withPreprocess: 50 };
      const result = numbersSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toContain(
        "Too big: expected number to be <=100",
      );
    });

    it("should reject non-number values", () => {
      const invalidData = {
        withSetValueAs: "not a number",
        withPreprocess: 50,
      };
      const result = numbersSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("withPreprocess field", () => {
    it("should preprocess string numbers to numbers only for withPreprocess field", () => {
      // This shows the difference: withPreprocess accepts strings and converts them
      const validData = { withSetValueAs: 50, withPreprocess: "75" };
      const result = numbersSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: 75 });

      // But withSetValueAs does not preprocess, so strings are invalid
      const invalidData = { withSetValueAs: "50", withPreprocess: "75" };
      const result2 = numbersSchema.safeParse(invalidData);
      expect(result2.success).toBe(false);
    });

    it("should preprocess empty string to null", () => {
      const emptyStringData = { withSetValueAs: 50, withPreprocess: "" };
      const result = numbersSchema.safeParse(emptyStringData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: null });
    });

    it("should preprocess undefined to null", () => {
      const undefinedData = { withSetValueAs: 50, withPreprocess: undefined };
      const result = numbersSchema.safeParse(undefinedData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: null });
    });

    it("should preprocess null to null", () => {
      const nullData = { withSetValueAs: 50, withPreprocess: null };
      const result = numbersSchema.safeParse(nullData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: null });
    });

    it("should preprocess invalid strings to null and accept it", () => {
      const invalidStringData = {
        withSetValueAs: 50,
        withPreprocess: "not a number",
      };
      const result = numbersSchema.safeParse(invalidStringData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: null });
    });

    it("should reject preprocessed numbers below 0", () => {
      const negativeStringData = { withSetValueAs: 50, withPreprocess: "-1" };
      const result = numbersSchema.safeParse(negativeStringData);
      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toContain(
        "Too small: expected number to be >=0",
      );
    });

    it("should reject preprocessed numbers above 100", () => {
      const largeStringData = { withSetValueAs: 50, withPreprocess: "101" };
      const result = numbersSchema.safeParse(largeStringData);
      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toContain(
        "Too big: expected number to be <=100",
      );
    });

    it("should handle numeric string with whitespace", () => {
      const whitespaceData = { withSetValueAs: 50, withPreprocess: "  42  " };
      const result = numbersSchema.safeParse(whitespaceData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: 42 });
    });
  });

  describe("schema structure", () => {
    it("should handle missing withPreprocess field by preprocessing undefined to null", () => {
      const missingField = { withSetValueAs: 50 };
      const result = numbersSchema.safeParse(missingField);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: null });
    });

    it("should allow extra fields (Zod default behavior)", () => {
      const extraField = {
        withSetValueAs: 50,
        withPreprocess: 75,
        extra: "field",
      };
      const result = numbersSchema.safeParse(extraField);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ withSetValueAs: 50, withPreprocess: 75 });
    });

    it("should require withSetValueAs field", () => {
      const missingRequired = { withPreprocess: 50 };
      const result = numbersSchema.safeParse(missingRequired);
      expect(result.success).toBe(false);
      expect(result.error.issues[0].path).toEqual(["withSetValueAs"]);
    });

    it("should handle both fields with mixed valid values", () => {
      const mixedData = [
        { withSetValueAs: 0, withPreprocess: "100" },
        { withSetValueAs: 100, withPreprocess: "0" },
        { withSetValueAs: null, withPreprocess: "50" },
        { withSetValueAs: 50, withPreprocess: null },
      ];

      mixedData.forEach((data) => {
        const result = numbersSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });
});
