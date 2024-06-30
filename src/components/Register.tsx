import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Registers as RegisterModel } from "../models/registers"; // Import RegisterModel from models
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form for form handling
import { SignUpUserCredentials } from "../network/websites_api"; // Import SignUpUserCredentials and WebsitesApi methods
import * as WebsitesApi from "../network/websites_api"; // Import WebsitesApi for API calls
import { Button, Card, Form } from "react-bootstrap"; // Import necessary components from react-bootstrap
import RegisterPage from "../styles/RegisterPage.module.css"; // Import styles for RegisterPage
import { formatDate } from "../utils/formatDate"; // Import formatDate utility function for date formatting
import styles from "../styles/RegisterPage.module.css"; // Import additional styles for RegisterPage

interface RegisterProps {
    registerForm: RegisterModel, // Define props interface with RegisterModel for registerForm
    onDeleteRegisterClicked: (register: RegisterModel) => void, // Callback function for delete action
    className?: string, // Optional className prop for custom styling
}

const Register = ({ registerForm, onDeleteRegisterClicked, className }: RegisterProps) => {
    
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const formId = `newUserForm_${registerForm._id}`; // Generate unique form ID based on registerForm ID
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpUserCredentials>(); // useForm hook for form management

    // Destructure properties from registerForm
    const {
        username,
        password,
        firstName,
        lastName,
        dob,
        email,
        address,
        town,
        postcode,
        phoneNumber,
        altPhoneNumber,
        gender,
        ethnicity,
        disability,
        disabilityDetails,
        assistance,
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        createdAt,
    } = registerForm;

    // Form submission handler
    async function onSubmit(input: SignUpUserCredentials) {
        try {
            await WebsitesApi.SignUpUser(input); // Call API to sign up user with input data
            await WebsitesApi.deleteRegisterWithoutEmail(registerForm._id); // Delete registerForm data after sign up
            navigate('/'); // Navigate back to home page after successful submission
        } catch (error) {
            console.error(error); // Log any errors to console
            alert(error); // Display alert with error message
        }
    }
    
    return ( 
        <>
            <br />
            <Card className={`${RegisterPage.cardBody} ${className}`}> {/* Card component with custom styling */}
                <Card.Body className={styles.register}> {/* Card body with specific styling */}
                    <Card.Text> {/* Card text containing registration form details */}
                        <Card.Title className={RegisterPage.mainTitle}>
                            <center><b>Registration Form</b></center> {/* Main title for registration form */}
                        </Card.Title>

                        {/* Display registration form data */}
                        Username: {username} <br />
                        Password: {password} <br />
                        Name: {firstName}, {lastName} <br />
                        Date of Birth: {dob} <br />
                        Address: {address}, {town}, {postcode} <br />
                        Email Address: {email} <br />
                        Phone Number: {phoneNumber} <br />
                        Additional Phone Number: {altPhoneNumber} <br />
                        Gender: {gender} <br />
                        Ethnicity: {ethnicity} <br />
                        Disability: {disability} <br />
                        Disability Details: {disabilityDetails} <br />
                        Assitance: {assistance} <br /> <br />

                        {/* Emergency contact details */}
                        <Card.Title>
                            <center><b>Emergency Contact Details</b></center>
                        </Card.Title>

                        Emergency Name: {emergencyName} <br />
                        Emergency Phone: {emergencyPhone} <br />
                        Emergency Relationship: {emergencyRelationship} <br />

                        {/* Hidden form for handleSubmit */}
                        <Form id={formId} onSubmit={handleSubmit(onSubmit)} hidden>
                            {/* Form controls for user registration data */}
                            <Form.Control
                                type="text"
                                defaultValue={username}
                                {...register("username")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={password}
                                {...register("password")}
                            />
                            <Form.Control
                                type="text"
                                defaultValue={firstName}
                                {...register("firstName")}
                            />
                            {/* Additional form controls omitted for brevity */}
                        </Form>
                        <br />
                        <center>
                            {/* Buttons for form submission and deletion */}
                            <Button
                                type="submit"
                                form={formId}
                                disabled={isSubmitting}
                                variant="success"
                                style={{ marginRight: "20px" }}>
                                    Approved {/* Button to approve registration */}
                            </Button>
                            <Button
                                onClick={() => {
                                    onDeleteRegisterClicked(registerForm); // Button to reject registration
                                }}
                                variant="danger">
                                    Rejected {/* Button to reject registration */}
                            </Button>
                        </center>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Registeration Submitted: {formatDate(createdAt)} {/* Display formatted date of registration */}
                </Card.Footer>
            </Card> <br /> <br />
        </>
    );
}
 
export default Register;
