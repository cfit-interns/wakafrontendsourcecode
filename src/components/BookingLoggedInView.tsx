import { useNavigate } from "react-router-dom";
import { Bookings } from "../models/bookings";
import { useForm } from "react-hook-form";
import { BookingDetail } from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import styles from "../styles/BookingPage.module.css";
import { Button, Card, Form } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { useEffect, useState } from "react";
import { Rosters } from "../models/rosters";

interface BookingPageLoggedInViewProps {
  onBookingSaved: (bookings: Bookings) => void; // Callback function when booking is saved
}

const BookingPagedLoggedInView = ({ onBookingSaved }: BookingPageLoggedInViewProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingDetail>();

  const [dateList, setDateList] = useState<Rosters[]>([]);

  // Watch for changes in the 'date' field
  const watchDate = watch('date', '');

  useEffect(() => {
    if (watchDate) {
      console.log("Selected Date: ", watchDate);
      getSuggestions(watchDate);
    }
  }, [watchDate]);

  // Fetch available suggestions based on selected date
  async function getSuggestions(date: string) {
    try {
      const suggestions = await WebsitesApi.getDestinationSuggestions(date);
      setDateList(suggestions);
      console.log(suggestions);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Handle form submission
  async function onSubmit(input: BookingDetail) {
    try {
      const bookingResponse = await WebsitesApi.createBooking(input);
      onBookingSaved(bookingResponse); // Invoke callback when booking is successfully saved
      navigate('/BookingReceivedPage'); // Navigate to BookingReceivedPage after submission
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className={`${styles.bookingpageContents}`}>
      <Card className={`${styles.card} p-2`}>
        <Card.Title className={styles.title}>
          <br/>
          <center><b>Booking Request Form</b></center>
        </Card.Title>
        <br/>
        <Form id='bookingForm' onSubmit={handleSubmit(onSubmit)}>
          {/* Form inputs for booking details */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Passenger's First Name</Form.Label>
                <Form.Control
                  type="text"
                  className="inputBootstrap"
                  placeholder="First Name"
                  isInvalid={!!errors.firstName}
                  {...register("firstName", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Passenger's Last Name</Form.Label>
                <Form.Control
                  type="text"
                  className="inputBootstrap"
                  placeholder="Last Name"
                  isInvalid={!!errors.lastName}
                  {...register("lastName", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Passenger's Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  className="inputBootstrap"
                  placeholder="Phone Number"
                  isInvalid={!!errors.phoneNumber}
                  {...register("phoneNumber", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Passenger's Email Address</Form.Label>
                <Form.Control
                  type="email"
                  className="inputBootstrap"
                  placeholder="email@example.com"
                  isInvalid={!!errors.email}
                  {...register("email", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="pickup">
                <Form.Label>Pick Up Address</Form.Label>
                <Form.Control
                  type="text"
                  className="inputBootstrap"
                  placeholder="Pick Up Address"
                  isInvalid={!!errors.pickup}
                  {...register("pickup", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pickup?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="destination">
                <Form.Label>Destination Address</Form.Label>
                <Form.Control
                  type="text"
                  className="inputBootstrap"
                  placeholder="Destination Address"
                  isInvalid={!!errors.destination}
                  {...register("destination", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.destination?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3" controlId="wheelchair">
                <Form.Label>Wheelchair Owning</Form.Label>
                <div key="inline">
                  <Form.Check
                    inline
                    type={"radio"}
                    value={"Yes"}
                    label={"Yes"}
                    {...register("wheelchair", { required: "Required" })}
                  />
                  <Form.Check
                    inline
                    type={"radio"}
                    value={"No"}
                    label={"No"}
                    {...register("wheelchair", { required: "Required" })}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.wheelchair?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group className="mb-3" controlId="passenger">
                <Form.Label>Number of Passengers</Form.Label>
                <div key="inline">
                  <Form.Check
                    inline
                    type={"radio"}
                    value={1}
                    label={'1'}
                    {...register("passenger", { required: "Required" })}
                  />
                  <Form.Check
                    inline
                    type={"radio"}
                    value={2}
                    label={'2'}
                    {...register("passenger", { required: "Required" })}
                  />
                </div>
                <Form.Control.Feedback>
                  {errors.passenger?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3" controlId="trip">
                <Form.Label>Alternative Number of Trips</Form.Label>
                <div key="inline">
                  <Form.Check
                    inline
                    type={"radio"}
                    value={"One-Way Trip"}
                    label={'One-Way Trip'}
                    {...register("trip", { required: "Required" })}
                  />
                  <Form.Check
                    inline
                    type={"radio"}
                    value={'Return Trip'}
                    label={'Return Trip'}
                    {...register("trip", { required: "Required" })}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.trip?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-6">
              <TextInputField
                className="mb-3"
                name="date"
                label="Booking Date"
                type="date"
                placeholder="Please choose the booking date"
                register={register}
                registerOptions={{ required: "Required" }}
                error={errors.date}
              />
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="purpose">
                <Form.Label>Purpose of Trip</Form.Label>
                <Form.Select
                  aria-label="purpose"
                  isInvalid={!!errors.purpose}
                  {...register("purpose", { required: "Required" })}
                >
                  <option value="" disabled selected>Please click to select one option</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Medical Appointment">Medical Appointment</option>
                  <option value="City Centre">City Centre</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.purpose?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          {/* Display available times for selected date */}
          <div className="row">
            {dateList.length > 0 ? <h3>The current available time</h3> : <>
              {watchDate && <h3 style={{ color: 'red' }}>There is no available time</h3>}
            </>}
            {dateList && dateList.map((date, index) => (
              <div className="col-md-6" key={index}>
                <span>startTime--finishTime :</span>
                <span>{date.startTime} -- {date.finishTime}</span>
              </div>
            ))}
          </div>
          <br/>
          {/* Additional input fields */}
          <div className="row">
            <div className="col-md-6">
              <TextInputField
                className="mb-3"
                name="pickupTime"
                label="Pick-Up Time"
                type="time"
                placeholder="Please select pick up time"
                register={register}
                registerOptions={{ required: "Required" }}
                error={errors.pickupTime}
              />
            </div>
            <div className="col-md-6">
              <TextInputField
                className="mb-3"
                name="dropoffTime"
                label="Drop-Off Time"
                type="time"
                placeholder="Please select drop off time"
                register={register}
                registerOptions={{ required: "Required" }}
                error={errors.dropoffTime}
              />
            </div>
          </div>
          <br/>
          {/* Additional notes */}
          <Form.Group className="mb-3" controlId="additionalNotes">
            <Form.Label>Additional Notes for Drivers</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Are there any access issues for our vehicle to reach your house (for example, steep driveway/shared driveway etc.)?"
              isInvalid={!!errors.additionalNotes}
              {...register("additionalNotes", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.additionalNotes?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Submit button */}
          <center>
            <Button
              type="submit"
              form="bookingForm"
              disabled={isSubmitting}
              className={styles.submit_button}
              variant="success"
            >
              Submit
            </Button>
          </center>
          <br/>
        </Form>
      </Card>
      <br/>
    </div>
  );
}

export default BookingPagedLoggedInView;
