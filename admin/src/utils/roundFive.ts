export const roundFive = (a: any) => {
  var b = a % 5;
  b && (a = a - b + 5);

  return a;
};
