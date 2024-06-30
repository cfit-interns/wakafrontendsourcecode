import styles from "../styles/CalendarPage.module.css";

interface CalendarDayProps {
    date: Date;                 // Date to display for this calendar day
    dayEventBadge: number;      // Number of events for this day (to show on badge)
    onClick: (date: Date) => void;  // Callback function when the day is clicked
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, dayEventBadge, onClick }) => {
    // Handle click event on the calendar day
    const handleDayClick = () => {
        onClick(date);  // Call onClick callback with the date parameter
    }

    return (
        <div className={styles.calendar_day} onClick={handleDayClick}>
            {date.getDate()} {/* Display the day of the month */}
            &nbsp;
            {/* Render a badge if there are events on this day */}
            {dayEventBadge > 0 && <span className="badge text-bg-danger">{dayEventBadge}</span>}
        </div>
    );
};

export default CalendarDay;
