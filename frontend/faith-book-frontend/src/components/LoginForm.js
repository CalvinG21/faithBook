import React, { useState,useEffect } from 'react';
import { Form, Button, Col, Row ,Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Importing the action creators we’ve implemented in our counter reducer.
import { reset,updateLoginUser } from '../redux/bibleVerseUpdateStore'

const LoginForm = (props) => {


  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [formType, setFormType] = useState(props.formType);
  console.log(props.formType)
  console.log(formType)
  useEffect(()=>{
    
        formType==-1?
        (()=>{
           
          //remove jwt from local storage
          localStorage.removeItem('token');
          dispatch(reset());
          setUsername('');
          setPassword('');
          alert("You have successfully logged out of your account") 
         console.log("reset")
           
        })()
        : 
        setFormType(1)
    },[props.formType])


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you can perform the login logic, such as sending a request to your server
    console.log('Login submitted:', { username, password });
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({ username, password }),
      });

    

      // Handle success login
      const responseData = await response.json();
      console.log('Response data:', responseData);
      if(responseData.error)
      {
        alert("Failed to login. "+JSON.stringify(responseData.error))
      }
      else if(responseData.pass)
      {
        alert('successfully Logged in')
        // Store the token in local storage
        localStorage.setItem('token', responseData.token);
        dispatch(updateLoginUser({loggedIn:true}))
        navigate("/home");
      }
      
      
    
    } catch (error) {
      console.error('Error:', error.message);
      alert("Failed to login. "+JSON.stringify(error.message))
    }
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
                <h6>Let get you logged in!</h6>
                <Form onSubmit={handleSubmit} className="text-light" style={{backgroundColor:'black'}}>
                    <Row >
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
                    <Row className='mb-5'>
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
                   
                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <Row className="mt-3">
                        <Col>
                        <p>
                            Don't have an account yet?{' '}
                            <a href="/">Let's get you signed up</a>
                        </p>
                        </Col>
                    </Row>
                </Form>
            </Col>
            </Row>    
        
    </Container>
    
  );
};

export default LoginForm;
