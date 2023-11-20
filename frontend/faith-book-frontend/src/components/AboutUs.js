import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>About FaithBook</h1>
          <p>
            Welcome to FaithBook, a community-driven platform designed to
            inspire and uplift your spiritual journey. Our mission is to provide
            a space where believers can connect, share, and grow together in
            faith.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Our Purpose</h2>
          <p>
            At FaithBook, we believe in the power of community and the
            transformative impact of sharing faith experiences. Our platform is
            dedicated to helping you strengthen your relationship with God,
            discover daily inspiration, and connect with others on a similar
            journey.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>What We Offer</h2>
          <p>
            - Daily devotionals to kickstart your day with inspiration.
            <br />
            - A personal journal to document your spiritual reflections.
            <br />
            - A prayer board to share your prayer requests and lift others in
            prayer.
            <br />
            - A space to share your testimonies and encourage the FaithBook
            community.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Join Us on this Journey</h2>
          <p>
            Whether you're seeking daily encouragement, a place to share your
            faith journey, or a community to connect with, FaithBook welcomes
            you. Join us on this journey of faith, and let's inspire and uplift
            each other along the way.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
