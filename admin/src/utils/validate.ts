export const validatePrice = (price: string | number, min: number, max: number) => {
  const value = Number(price);
  if (!value || isNaN(value)) return "Value is required";
  if (value < min) return "Value must be greater than " + min;
  if (value > max) return "Value must be less than " + max;
  return "";
};

export const validateString = (value: string, min: number, max: number) => {
  if (!value || value.length === 0) return "Value is required";
  if (value.length < min) return "Value must be greater than " + min + " characters ";
  if (value.length > max) return "Value must be less than " + max + " characters ";
  return "";
};
