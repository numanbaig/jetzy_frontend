
const MONTHS = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
] as const;

const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
] as const;

const WEEK_DAYS = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
] as const;

const WEEK_DAYS_SHORT = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
] as const;


type MonthType = typeof MONTHS[number];
type WeekDayType = typeof WEEK_DAYS[number];

export {
    MONTHS,
    MONTHS_SHORT,
    WEEK_DAYS,
    WEEK_DAYS_SHORT,
};

export type { MonthType, WeekDayType }