import { Button } from "react-bootstrap"; // Import Button component from react-bootstrap
import styles from "../styles/footer.module.css"; // Import styles for the component

interface FooterLoggedOutViewProps {
    onStaffLoginClicked: () => void, // Callback function triggered when staff login button is clicked
}

const FooterLoggedOutView = ({ onStaffLoginClicked }: FooterLoggedOutViewProps) => {
    return ( 
        <Button className={styles.button} onClick={onStaffLoginClicked}>Staff Log In</Button>
        // Button component with:
        // - className set to styles.button for styling
        // - onClick event handler that calls onStaffLoginClicked when button is clicked
        // - Displays "Staff Log In" text on the button
    );
}

export default FooterLoggedOutView;
