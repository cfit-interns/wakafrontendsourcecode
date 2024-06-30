import { Button, Card } from "react-bootstrap";
import { Bookings as BookingModel } from "../models/bookings";
import styles from "../styles/BookingPage.module.css";
import { formatDate } from "../utils/formatDate"; // Importing formatDate utility function

interface BookingProps {
    bookingForm: BookingModel, // Props interface with bookingForm of type BookingModel
    onDeleteBookingClicked: (booking: BookingModel) => void, // Callback function for deleting a booking
    className?: string, // Optional className prop
}

const Booking = ({ bookingForm, onDeleteBookingClicked, className }: BookingProps) => {

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        pickup,
        destination,
        wheelchair,
        passenger,
        purpose,
        trip,
        date,
        pickupTime,
        dropoffTime,
        additionalNotes,
        createdAt  
    } = bookingForm; // Destructuring bookingForm props

    return ( 
        <>
            <br/>

            {/* Card component displaying booking details */}
            <Card className={styles.cardBody}>
                <Card.Body>
                    <Card.Text>
                        <Card.Title>
                            <center><b>Booking Request Form</b></center> {/* Center-aligned title */}
                        </Card.Title>
                        {/* Displaying booking details */}
                        Passenger's Name: {firstName} {lastName} <br />
                        Phone Number: {phoneNumber} <br />
                        Email Address: {email} <br />
                        Pick Up Address: {pickup} <br />
                        Destination Address: {destination} <br />
                        Wheelchair Owning: {wheelchair} <br />
                        Number of Passengers: {passenger} <br />
                        Purpose of Trip: {purpose} <br />
                        Alternative Number of Trips: {trip} <br />
                        Booking Date: {date} <br />
                        Pick-Up Time: {pickupTime} <br />
                        Drop-Off Time: {dropoffTime} <br />
                        Additional Notes for Driver: {additionalNotes} <br />
                        <br />
                        <center>
                            {/* Button to cancel booking */}
                            <Button
                                onClick={() => {
                                    onDeleteBookingClicked(bookingForm); // Calling onDeleteBookingClicked with bookingForm
                                }}
                                variant="success">
                                Cancel Booking Request
                            </Button>
                        </center>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Booking Request Submitted: {formatDate(createdAt)} {/* Formatting createdAt date */}
                </Card.Footer>
            </Card><br />
            
        </>
    );
}
 
export default Booking; // Exporting Booking component
