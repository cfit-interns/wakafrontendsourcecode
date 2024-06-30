import { Container, Nav, Navbar } from "react-bootstrap";
import { Staff } from "../models/staff";
import FooterLoggedOutView from "./FooterLoggedOutView";
import StaffLoggedInView from "./StaffLoggedInView";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

interface FooterProps {
  loggedInStaff: Staff | null, // Prop for logged-in staff information
  onStaffLoginClicked: () => void, // Callback for staff login click
  onStaffLogoutSuccessful: () => void, // Callback for successful staff logout
  onStaffRegisterClicked: () => void, // Callback for staff registration click
}

const Footer = ({ loggedInStaff, onStaffLoginClicked, onStaffLogoutSuccessful, onStaffRegisterClicked }: FooterProps) => {
  return (
    <Navbar style={{ backgroundColor: '#1C393B' }} variant="dark" expand="sm">
      <Container>
        {/* Conditional rendering of Navbar.Brand based on loggedInStaff */}
        {
          loggedInStaff ? (
            <Navbar.Brand as={Link} to="/adminLink" className={styles.title}>
              Waka Eastern Bay <br/> Transport Community
            </Navbar.Brand>
          ) : (
            <Navbar.Brand as={Link} to="/" className={styles.title}>
              Waka Eastern Bay <br/> Transport Community
            </Navbar.Brand>
          )
        }
        <Nav className="ms-auto">
          {/* Conditional rendering of staff views based on loggedInStaff */}
          {loggedInStaff ? (
            <StaffLoggedInView
              staff={loggedInStaff}
              onStaffLogoutSuccessful={onStaffLogoutSuccessful}
              onStaffRegisterClicked={onStaffRegisterClicked}
            />
          ) : (
            <FooterLoggedOutView onStaffLoginClicked={onStaffLoginClicked} />
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
