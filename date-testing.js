import {
  addBusinessDays,
  addDays,
  differenceInDays,
  format,
  getMonth,
  getYear,
  isEqual,
  isWithinInterval,
  parse,
  parseISO,
  setMonth,
  setYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

// Parse from ISO string
const date1 = parseISO("2023");

// Parse from custom format
const date2 = parse("04/04/2023", "MM/dd/yyyy", new Date());

// pass the date
// format
// fallback

const today = new Date();
const tomorrow = subYears(today, 100); // 13 days ago
const lastMonth = subMonths(today, 1);
const daysDifference = differenceInDays(tomorrow, today); // 1

// Days, weeks, months, years, etc. (add / subtract)
const lastWeek = subWeeks(today, 1); // 7 days ago
const nextWeek = addDays(today, 7); // 7 days from now
const lastYear = subYears(today, 1); // 1 year ago
const nextYear = addDays(today, 365); // 1 year from now
const nextMonth = addDays(today, 30); // 30 days from now
const nextDay = addDays(today, 1); // 1 day from now
const lastDay = subDays(today, 1); // 1 day ago

// console.log(format(tomorrow, "PPPpp")); //

// ISO Format
// console.log(format(tomorrow, "yyyy-MM-dd'T'HH:mm:ssXXX")); // 2023-10-04T00:00:00+00:00

// console.log(daysDifference);

// What we have acomplished...
// 1. Parse from ISO string
// 2. Parse from custom format
// 3. Format date to string
// 4. Format date to ISO string
// 5. Format date to custom format (PPPP,pppp,....)
// 6. Add / subtract days, weeks, months, years, etc.
// 7. Difference between two dates in days, weeks, months, years, etc.
// 8. Format date to string with fallback (if date is invalid)
// 9. Format date to ISO string with fallback (if date is invalid)
// 10. Format date to custom format with fallback (if date is invalid)

import { isBefore, isAfter } from "date-fns";

const now = new Date();
const deadline = new Date("2025-04-20"); // Example date in the future

// console.log(isBefore(now, deadline)); // true
// console.log(isEqual(deadline, deadline)); // false

const day1 = new Date("2025-04-1");
const day2 = new Date("2025-04-10");

const checkingDate = new Date("2025-1-05");



console.log(
  isWithinInterval(checkingDate, {
    start: day1,
    end: day2,
  })
);

console.log("Get Year:", getYear(checkingDate));
console.log("SET Year:", setYear(checkingDate, 2000));

console.log("Get Month:", getMonth(checkingDate));
console.log("SET Month:", setMonth(checkingDate, 1));

console.log("Get Current Date and Time:", format(new Date(),"PPPPpppp"));


// Business Day

const yesterday = "2023-04-12";

console.log(addBusinessDays(new Date(yesterday),10));