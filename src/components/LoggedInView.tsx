import location from "../styles/location.jpg"; // Import image for location card
import vision from "../styles/vision.png"; // Import image for vision card
import purpose from "../styles/purpose.png"; // Import image for purpose card
import service from "../styles/service.png"; // Import image for service card
import supporting from "../styles/supporting.png"; // Import image for supporting card
import styles from "../styles/HomePage.module.css"; // Import styles for the component
import { Card, Col, Row } from "react-bootstrap"; // Import Card, Col, Row components from react-bootstrap

// Array of card details including image source and title
const cardDetails = [
    {
        imageSrc: vision,
        title: 'Our Vision',
    },
    {
        imageSrc: purpose,
        title: 'Our Purpose',
    },
    {
        imageSrc: service,
        title: 'Our Service',
    },
    {
        imageSrc: supporting,
        title: 'Our Support',
    }
];

// Functional component for the logged-in view of the homepage
const LoggedInView = () => {
    return (
        <>
            <div className={styles.contents}>
                {/* Card for displaying location information */}
                <div className="card mb-3 rounded">
                    <img className={location} src={location} alt="Location" /> {/* Location image */}
                    <div className="card-body">
                        <h5 className="card-title">Our Location</h5>
                        <p className="card-text">VISIT US: Knox Presbyterian Church, 83A Domain Road, Whakatane</p>
                    </div>
                </div>

                {/* Row layout for displaying multiple cards */}
                <Row xs={1} md={2} className="g-4 rounded">
                    {cardDetails.map((card, idx) => (
                        <Col key={idx}>
                            {/* Card component displaying each card detail */}
                            <Card style={{ width: "100%", height: "100%" }}>
                                <Card.Img variant="top" src={card.imageSrc} /> {/* Card image */}
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title> {/* Card title */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br />
            </div>
        </>
    );
}

export default LoggedInView;
