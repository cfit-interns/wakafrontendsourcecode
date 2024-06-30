import { Calendars } from "../models/calendars";
import { useForm } from "react-hook-form";
import { CalendarDetail } from "../network/websites_api"; // Importing CalendarDetail type from websites_api
import * as WebsitesApi from "../network/websites_api"; // Importing all exports from websites_api
import { Button, Form, Modal } from "react-bootstrap";
import styles from "../styles/CalendarPage.module.css";
import TextInputField from "./form/TextInputField";

interface AddEditCalendarDialogProps {
    calendarToEdit?: Calendars, // Optional calendar object for editing
    selectedDate: Date | null; // Nullable selected date
    onDismiss: () => void, // Callback function for modal dismissal
    onCalendarSaved: (calendar: Calendars) => void, // Callback function for saving calendar
}

const AddEditCalendarDialog = ({ calendarToEdit, selectedDate, onDismiss, onCalendarSaved }: AddEditCalendarDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CalendarDetail>({
        defaultValues: {
            date: calendarToEdit?.date || "", // Setting default values from calendarToEdit or empty string
            title: calendarToEdit?.title || "",
            description: calendarToEdit?.description || "",
            location: calendarToEdit?.location || "",
            startTime: calendarToEdit?.startTime || "",
            endTime: calendarToEdit?.endTime || "",
        }
    });

    async function onSubmit(detail: CalendarDetail) {
        try {
            if (selectedDate) {
                detail.date = selectedDate.toISOString().split("T")[0]; // Formatting selectedDate to ISO date string
            } else {
                console.error("Selected date is not available"); // Logging error if selectedDate is null
            }

            let calendarResponse: Calendars;
            if (calendarToEdit) {
                calendarResponse = await WebsitesApi.updateCalendars(calendarToEdit._id, detail); // Updating calendar if editing
            } else {
                calendarResponse = await WebsitesApi.createCalendars(detail); // Creating new calendar if not editing
            }
            onCalendarSaved(calendarResponse); // Calling onCalendarSaved with the response
        } catch (error) {
            console.error(error); // Logging and alerting error if any
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.Title}>
                    {calendarToEdit? "Edit Event" : "Add Event"} {/* Displaying modal title based on calendarToEdit */}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label className={styles.date}>
                    <b><center>Date: {selectedDate?.toDateString()}</center></b> {/* Displaying selectedDate in modal body */}
                </Form.Label>
            </Modal.Body>
            <Modal.Body className={styles.calendarPage}>
                <Form id="addEditCalendarForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Calendar Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        as="textarea"
                        rows={4}
                        name="description"
                        label="Description"
                        placeholder="Calendar Description"
                        register={register}
                        error={errors.description}
                    />

                    <TextInputField
                        name="location"
                        label="Location"
                        type="text"
                        placeholder="Calendar Location"
                        register={register}
                        error={errors.location}
                    />

                    <TextInputField
                        name="startTime"
                        label="Start Time"
                        type="time"
                        placeholder="Calendar Start Time"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.startTime}
                    />

                    <TextInputField
                        name="endTime"
                        label="End Time"
                        type="time"
                        placeholder="Calendar End Time"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.endTime}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className={styles.button}
                    type="submit"
                    form="addEditCalendarForm"
                    disabled={isSubmitting} // Disabling button while form is submitting
                    >
                        Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddEditCalendarDialog; // Exporting AddEditCalendarDialog component
