import { useNavigate } from "react-router-dom";
import { Calendars } from "../models/calendars";
import { CalendarDetail } from "../network/websites_api";
import { useForm } from "react-hook-form";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/CalendarPage.module.css";
import { Card, Form } from "react-bootstrap";

interface CalendarPageLoggedInViewProps {
    onCalendarSaved: (calendars: Calendars) => void, // Prop to handle saved calendar data
}

const CalendarPageLoggedInView = ({ onCalendarSaved }: CalendarPageLoggedInViewProps) => {
    const navigate = useNavigate(); // Navigate function from react-router-dom
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CalendarDetail>(); // useForm hook for form handling

    // Form submit handler
    async function onSubmit(input: CalendarDetail) {
        try {
            // Call API to create calendar entry
            const calendarResponse = await WebsitesApi.createCalendars(input);
            // Invoke callback to handle saved calendar data
            onCalendarSaved(calendarResponse);
            // Navigate back to home page after successful submission
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error); // Display error message if API call fails
        }
    }

    return (
        <div className={styles.calendarpageContents}>
            {/* Card container for calendar form */}
            <Card className={`${styles.card}`}>
                {/* Title section */}
                <Card.Title className={styles.title}> <br />
                    <center><b>Waka Eastern Bay Community Transport's Calendar</b></center>
                </Card.Title> <br />
                {/* Form section */}
                <Form id='calendarForm' onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {/* Form fields will go here */}
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default CalendarPageLoggedInView;
