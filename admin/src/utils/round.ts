export const roundOrNull = (
  number?: string | number | null,
  umnoz?: number
): number => {
  if (!number) {
    return 0;
  }
  const n = Math.round(umnoz ? Number(number) * umnoz : Number(number));
  const b = n % 5;

  return b ? n - b + 5 : n;
};
