import { Button, Nav } from "react-bootstrap"; // Import necessary components from react-bootstrap
import styles from "../styles/navbar.module.css"; // Import styles for the navbar
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation

interface NavBarLoggedOutViewProps {
    onUserSignUpClicked: () => void, // Callback function for sign-up button click
    onUserLoginClicked: () => void, // Callback function for login button click
}

const NavBarLoggedOutView = ({ onUserSignUpClicked, onUserLoginClicked }: NavBarLoggedOutViewProps) => {
    return ( 
        <>
            <Nav>    
                <Nav.Link as={Link} to='/registerpage'> {/* Navigation link to register page */}
                    <Button className={styles.button}>Sign Up</Button> {/* Sign Up button with custom styling */}
                </Nav.Link>
            </Nav>
            <Button className={styles.button} onClick={onUserLoginClicked}>Log In</Button> {/* Log In button with custom styling and onClick handler */}
        </>
     );
}
 
export default NavBarLoggedOutView;
