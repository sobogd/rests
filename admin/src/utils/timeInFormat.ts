import { format } from "date-fns";

export const getTimeInFormat = (inputDate: any) => {
  const createDate = Date.parse(inputDate);
  const offset = new Date().getTimezoneOffset();
  const dateWithTimeZone = createDate - offset * 60000;
  const date = format(dateWithTimeZone, "HH:mm");

  return date;
};
