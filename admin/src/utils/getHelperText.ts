import { LiteralUnion } from "react-hook-form";

export const getHelperText = (
  type?:
    | "value"
    | "pattern"
    | "disabled"
    | "required"
    | "onBlur"
    | "onChange"
    | "min"
    | "max"
    | "maxLength"
    | "minLength"
    | "validate"
    | "valueAsNumber"
    | "valueAsDate"
    | "setValueAs"
    | "shouldUnregister"
    | "deps"
    | undefined
): string => {
  switch (type) {
    case "minLength":
      return "Minimal length is too small";
    case "maxLength":
      return "Maximum length exceeded";
    case "min":
      return "Value is too small";
    case "max":
      return "Maximum value exceeded";
    case "pattern":
      return "Incorrect pattern";
    case "required":
      return "Field is required";
    default:
      return "";
  }
};
