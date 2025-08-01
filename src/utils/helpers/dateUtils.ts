import { MONTHS,MONTHS_SHORT, WEEK_DAYS,WEEK_DAYS_SHORT } from "../constants/date";

 function getMonthName(monthNumber: number): string | null {
    return MONTHS[monthNumber - 1] ?? null;
  }
  
   function getMonthShortName(monthNumber: number): string | null {
    return MONTHS_SHORT[monthNumber - 1] ?? null;
  }
  
   function getWeekdayName(weekdayNumber: number): string | null {
    return WEEK_DAYS[weekdayNumber - 1] ?? null;
  }
  
   function getWeekdayShortName(weekdayNumber: number): string | null {
    return WEEK_DAYS_SHORT[weekdayNumber - 1] ?? null;
  }
  

  export {getMonthName,getMonthShortName,getWeekdayName,getWeekdayShortName}