import location from "../styles/location.jpg"; // Import image for location card
import vision from "../styles/vision.png"; // Import image for vision card
import purpose from "../styles/purpose.png"; // Import image for purpose card
import service from "../styles/service.png"; // Import image for service card
import supporting from "../styles/supporting.png"; // Import image for supporting card
import { Button, Card, Col, Row } from "react-bootstrap"; // Import necessary components from react-bootstrap
import styles from "../styles/HomePage.module.css"; // Import styles for the component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

// Array of card details including image source, title, content, button text, and background color
const cardDetails = [
  {
    imageSrc: vision,
    title: 'Our Vision',
    content: 'To help connect Eastern Bay communities and ensure they are inclusive, safe and thriving.',
    buttonText: 'Detail',
    bgColor: "#FF9966"
  },
  {
    imageSrc: purpose,
    title: 'Our Purpose',
    content: "To support solutions ensuring equitable and accessible travel options suitable for Eastern Bay community.",
    buttonText: 'Detail',
    bgColor: "#006600"
  },
  {
    imageSrc: service,
    title: 'Our Service',
    content: " We have an accessible van to accommodate a wheelchair and all our drivers are trained to help support passengers.<br /> In order to ensure We have a volunteer available for your transport needs, all transport requests must be booked 24 hours before transport is required. <br />Days of Operation: Monday to Friday Times of Operation: 9 am to 3 pm Booking Contact: pm@wakaeasternbay.org.nz",
    buttonText: 'Detail',
    bgColor: "#006600"
  },
  {
    imageSrc: supporting,
    title: 'SUPPORTING COMMUNITIES Carpooling',
    content: "We are currently offering support to encourage community carpooling. <br /> If you are interested in carpooling, please contact：pm@wakaeasternbay.org.nz",
    buttonText: 'Detail',
    bgColor: "#FF9966"
  },
];

// Functional component for the logged-out view of the homepage
const LoggedOutView = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook to handle navigation

  return (
    <>
      <div className={styles.contents}>
        {/* Card for displaying location information */}
        <div className="card mb-3 rounded">
          <img className={location} src={location} alt="Location" />
          <div className="card-body">
            <h5 className="card-title">Our Location</h5>
            <p className="card-text">VISIT US: Knox Presbyterian Church, 83A Domain Road, Whakatane</p>
          </div>
        </div>

        {/* Row layout for displaying multiple cards */}
        <Row xs={1} md={2} className="col g-4 rounded">
          {cardDetails.map((card, idx) => (
            <Col key={idx}>
              <div className="d-flex flex-column border rounded-top">
                {/* Card header with background color and title */}
                <div style={{
                  backgroundColor: card.bgColor,
                  minHeight: '200px'
                }} className="d-flex flex-column align-items-center border rounded-top text-white">
                  <h4 className="fs-3 text-white pt-4 text-center text-decoration-underline">
                    {card.title.toUpperCase()} {/* Display card title in uppercase */}
                  </h4>
                  {/* Display card content with HTML formatting */}
                  <span className="p-2 lh-lg text-center align-self-center" style={{ fontSize: idx === 2 ? "12px" : '17px', fontWeight: idx === 2 ? '' : 700 }}
                        dangerouslySetInnerHTML={{ __html: card.content.replace(/\n/g, '<br>') }}>
                  </span>
                </div>
                {/* Button for navigating to detail page */}
                <Button className="m-1 align-self-end" variant="primary" onClick={() => {
                  navigate('/'); // Navigate to '/' path on button click
                }}>{card.buttonText}</Button>
              </div>
            </Col>
          ))}
        </Row>
        <br />
      </div>
    </>
  );
}

export default LoggedOutView;
