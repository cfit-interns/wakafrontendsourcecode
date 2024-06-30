import CalendarDay from "./CalendarDay";
import styles from "../styles/CalendarPage.module.css";
import { useEffect, useState } from "react";
import { Calendars as CalendarModel } from "../models/calendars";
import * as WebsitesApi from "../network/websites_api";

interface CalendarGridProps {
  year: number;                             // Year of the calendar grid
  month: number;                            // Month of the calendar grid (0-based index)
  onDayClick: (date: Date) => void,         // Callback function when a day is clicked
}

interface dayEventBadge {
  count: number;                            // Number of events for a specific date
  date: string;                             // Date formatted as string (YYYY-MM-DD)
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ year, month, onDayClick }: CalendarGridProps) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();   // Total days in the given month
  const firstDayOfMonth = new Date(year, month, 1).getDay();    // Weekday index of the first day of the month

  // Generate an array of Date objects for each day in the month
  const days = Array.from({ length: daysInMonth }, (_, index) =>
    new Date(year, month, index + 1)
  );

  // State to hold day event badges
  const [dayEventBadge, setdayEventBadge] = useState<dayEventBadge[]>([]);

  // Fetch calendar data for the month when component mounts
  useEffect(() => {
    let arr = days.map((item, index) => {
      return formatDateToYYYYMMDD(item);   // Convert each Date to YYYY-MM-DD format
    });
    getMonthCalendars(arr);
  }, []);

  // Function to fetch calendar data for the given array of dates
  async function getMonthCalendars(dateArr: string[]) {
    try {
      const calendarResponse = await WebsitesApi.getMonthCalendars({ dateArr });
      setdayEventBadge(calendarResponse);   // Update state with fetched calendar data
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Function to format Date to YYYY-MM-DD string
  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based index
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Render the calendar grid
  return (
    <div className={`${styles.calendar_grid}`}>
      {/* Render weekday headers */}
      <div className={styles.weekday}>Sun</div>
      <div className={styles.weekday}>Mon</div>
      <div className={styles.weekday}>Tue</div>
      <div className={styles.weekday}>Wed</div>
      <div className={styles.weekday}>Thu</div>
      <div className={styles.weekday}>Fri</div>
      <div className={styles.weekday}>Sat</div>

      {/* Render empty placeholders for days before the first day of the month */}
      {Array.from({ length: firstDayOfMonth }, (_, index) => (
        <div key={`empty-${index}`} className="empty-day"></div>
      ))}

      {/* Render CalendarDay components for each day in the month */}
      {days.map((date, idx) => (
        <CalendarDay
          dayEventBadge={dayEventBadge[idx]?.count || 0}   // Pass count of events for the day, default to 0 if undefined
          key={date.toString()}                           // Unique key for each CalendarDay
          date={date}                                     // Date object for the day
          onClick={onDayClick}                            // onClick callback function
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
