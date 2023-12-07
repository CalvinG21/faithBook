import React, { useState } from 'react';
import { Form, Button, Col, Row ,Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset,updateLoginUser } from '../redux/bibleVerseUpdateStore'

const SignUpForm = () => {
  const dispatch = useDispatch();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const navigate = useNavigate();
const handleSubmit = async (event) => {
    event.preventDefault();

    // Password confirmation logic
    if (password !== confirmPassword) {
      // Handle password mismatch
      console.log('Password and Confirm Password do not match');
      alert("Password and Confirm Password do not match")
      return;
    }

    try {
     // let authToken="bearer "+localStorage.getItem('token');
      //console.log(authToken)
      const response = await fetch('/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        // Handle error cases
        console.log('Failed to fetch data:', response.statusText);
         alert("Failed to sign up!")
        return;
      }

      // Handle success cases
      const responseData = await response.json();
      console.log('##### sign up ##### Response data :', responseData);
      alert("Successfully signed up!")
      
      //Store the token in local storage
      localStorage.setItem('token', responseData.token);
      dispatch(updateLoginUser({loggedIn:true}))
      navigate("/home");
    } 
    catch (error) {
      alert("Failed to sign up!")
      console.log('Error:', error.message);
    }

    // Here you can perform the signup logic, such as sending a request to your server
    console.log('Signup submitted:', { username, email, password });
  };

  return (
    <Container className='mt-5'>
      <Row className='mt-5'>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>FaithBook</h1>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="text-light" style={{ backgroundColor: 'black' }}>
            <Row>
              <Col sm={{ span: 6, offset: 3 }} className='mt-3'>
                <Form.Group controlId="formUsername" className='mx-1'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 6, offset: 3 }} className='mt-3'>
                <Form.Group controlId="formEmail" className='mx-1'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 6, offset: 3 }} className='mt-3'>
                <Form.Group controlId="formPassword" className='mx-1'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col sm={{ span: 6, offset: 3 }} className='mt-3'>
                <Form.Group controlId="formConfirmPassword" className='mx-1'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>

            <Row className="mt-3">
              <Col>
                <p>
                  Already have an account?{' '}
                  <a href="/">Log in here</a>
                </p>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
