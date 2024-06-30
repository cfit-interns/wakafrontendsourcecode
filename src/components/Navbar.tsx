import { Container, Nav, Navbar } from "react-bootstrap"; // Import necessary components from react-bootstrap
import { User } from '../models/user'; // Import User model
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import UserLoggedInView from "./UserLoggedInView"; // Import UserLoggedInView component for logged-in user view
import NavBarLoggedOutView from "./NavBarLoggedOutView"; // Import NavBarLoggedOutView component for logged-out user view
import styles from "../styles/navbar2.module.css"; // Import styles for the navbar

interface NavBarProps {
  loggedInUser: User | null, // Prop for logged-in user object or null if no user is logged in
  onUserSignUpClicked: () => void, // Callback for sign-up click action
  onUserLoginClicked: () => void, // Callback for login click action
  onUserLogoutSuccessful: () => void, // Callback for successful logout action
}

const NavBar = ({ loggedInUser, onUserSignUpClicked, onUserLoginClicked, onUserLogoutSuccessful }: NavBarProps) => {
  return (
    <Navbar style={{backgroundColor:'#1C393B'}} className="shadow-lg z-3" variant="dark" expand="sm">
      <Container>
        {/* Conditional rendering of Navbar.Brand based on whether user is logged in */}
        {
          loggedInUser ? (
            <Navbar.Brand as={Link} to="/adminLink" className={styles.title}>
              Waka Eastern Bay Transport Community {/* Brand name for logged-in user */}
            </Navbar.Brand>
          ) : (
            <Navbar.Brand as={Link} to="/" className={styles.title}>
              Waka Eastern Bay Transport Community {/* Brand name for logged-out user */}
            </Navbar.Brand>
          )
        }
        <Navbar.Toggle aria-controls="main-navbar" /> {/* Navbar toggle button for responsive view */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto"> {/* Nav links aligned to the right */}
            { loggedInUser
              ? <UserLoggedInView user={loggedInUser} onUserLogoutSuccessful={onUserLogoutSuccessful} /> {/* Render logged-in view */}
              : <NavBarLoggedOutView onUserLoginClicked={onUserLoginClicked} onUserSignUpClicked={onUserSignUpClicked} /> {/* Render logged-out view */}
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
