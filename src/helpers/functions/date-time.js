import moment from "moment/moment";

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const checkDates = (dates) => {
  const date1 = moment(
    `${dates.departOn.substring(0, 10)} ${dates.departOn.substring(11, 17)}`
  );
  const date2 = moment(
    `${dates.returnOn.substring(0, 10)} ${dates.returnOn.substring(11, 17)}`
  );

  return date2 > date1.add(1, "h");
};

export const checkExpireDate = (date) => {
  if (!date) return false;
  if (date.includes("_")) return false;

  const expireDate = moment(date, "MM/YY").add(1, "month").add(-1, "day");

  if (!expireDate.isValid()) return false;
  if (expireDate < moment()) return false;

  return true;
};
