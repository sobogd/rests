import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const getTimeInFormat = (inputDate: any) => {
  const date1 = new Date(inputDate);
  const timeZone = "Europe/Moscow";
  const zonedDate = utcToZonedTime(date1, timeZone);
  const date = format(zonedDate, "HH:mm");

  return date;
};

export const getTimeInSeconds = (inputDate: any) => {
  const date1 = Math.round(new Date(inputDate).getTime() / 1000);

  return date1;
};
