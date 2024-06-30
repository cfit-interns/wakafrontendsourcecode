import { useForm } from "react-hook-form";
import { Rosters } from "../models/rosters";
import { RosterDetail } from "../network/websites_api"; // Importing RosterDetail type from websites_api
import { useEffect, useState } from "react";
import * as WebsitesApi from "../network/websites_api"; // Importing all exports from websites_api
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/RosterPage.module.css";

interface AddEditRosterDialogProps {
    rosterToEdit?: Rosters, // Optional roster object for editing
    onDismiss: () => void, // Callback function for modal dismissal
    onRosterSaved: (roster: Rosters) => void, // Callback function for saving roster
}

const AddEditRosterDialog = ({ rosterToEdit, onDismiss, onRosterSaved }: AddEditRosterDialogProps) => {

    // State for managing time and status arrays
    const [time, setTime] = useState<string[]>([]);
    const [newTime, setNewTime] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [status, setStatus] = useState<string[]>([]);

    // React Hook Form usage with RosterDetail type
    const { register, handleSubmit, formState : { errors, isSubmitting }, setValue } = useForm<RosterDetail>();

    // Effect to set form values when rosterToEdit changes
    useEffect(() => {
        if (rosterToEdit) {
            const { date, driverName, vehiclePlate, startTime, finishTime } = rosterToEdit;
            setValue("date", date);
            setValue("driverName", driverName);
            setValue("vehiclePlate", vehiclePlate);
            setValue("startTime", startTime);
            setValue("finishTime", finishTime);
            setValue("availabilityTime", time);
            setValue("availabilityStatus", status);
        }
    }, [rosterToEdit, time, status, setValue]);

    // Submit handler for form submission
    async function onSubmit(detail: RosterDetail) {
        try {
            let rosterResponse: Rosters;
            if (rosterToEdit) {
                rosterResponse = await WebsitesApi.updateRoasters(rosterToEdit._id, detail); // Updating roster if editing
            } else {
                rosterResponse = await WebsitesApi.createRosters(detail); // Creating new roster if not editing
            }
            onRosterSaved(rosterResponse); // Calling onRosterSaved with the response
        } catch (error) {
            console.error(error); // Logging and alerting error if any
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {rosterToEdit ? "Edit Roster" : "Add Roster"} {/* Displaying modal title based on rosterToEdit */}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.rosterPage}>
                <Form id="addEditRosterForm" onSubmit={handleSubmit(onSubmit)}>
                    {/* Form fields for roster details */}
                    <TextInputField
                        name="date"
                        label="Date"
                        type="date"
                        className="inputBootstrap"
                        placeholder="Date"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.date}
                    />

                    <TextInputField
                        name="driverName"
                        label="Driver's Name"
                        type="text"
                        className="inputBootstrap"
                        placeholder="Driver's Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.driverName}
                    />

                    <TextInputField
                        name="vehiclePlate"
                        label="Vehicle Plate"
                        type="text"
                        className="inputBootstrap"
                        placeholder="Vehicle Plate"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.vehiclePlate}
                    />

                    <TextInputField
                        name="startTime"
                        label="Roster starts from 09:00"
                        type="time"
                        className="inputBootstrap"
                        placeholder="09:00"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.startTime}
                    />

                    <TextInputField
                        name="finishTime"
                        label="Roster finishs by 14:30"
                        type="time"
                        className="inputBootstrap"
                        placeholder="14:30"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.finishTime}
                    />

                    {/* Displaying current roster times and statuses */}
                    <Form.Label>
                        <b>Roster</b>
                    </Form.Label>
                    <ol>
                        {time.map((time) =>
                            <li key={time}>{time}</li>)}
                    </ol>
                    <Form.Group>
                        <ol>
                            {status.map((status) =>
                                <li key={status}>{status}</li>)}
                        </ol>
                    </Form.Group>

                    {/* Form controls for adding new time and status */}
                    <Form.Group controlId="availabilityTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                        />
                    </Form.Group> <br />
                    <Form.Group controlId="availabilityStatus">
                        <Form.Label>Availability</Form.Label>
                        <Form.Select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}>
                                <option>Select availability type</option>
                                <option value={"Available"}>Available</option>
                                <option value={"Not-Available"}>Not-Available</option>
                                <option value={"Picking-Up"}>Picking-Up</option>
                                <option value={"Driving"}>Driving</option>
                                <option value={"Dropping-Off"}>Dropping-Off</option>
                        </Form.Select>
                    </Form.Group> <br />

                    {/* Button to add new time and status */}
                    <Button
                        className={styles.button}
                        onClick={() => {
                            setTime([...time, newTime]);
                            setStatus([...status, newStatus]);
                        }}>
                            <FaPlus/> {/* Icon for adding */}
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {/* Button to submit form */}
                <Button
                    className={styles.button}
                    type="submit"
                    form="addEditRosterForm"
                    disabled={isSubmitting} // Disabling button while form is submitting
                    >
                        Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditRosterDialog; // Exporting AddEditRosterDialog component
