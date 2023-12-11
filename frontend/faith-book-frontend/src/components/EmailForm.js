import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmailForm = () => {
  
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

    let getPayloadFromToken=(token)=> {
        // Split the token into header, payload, and signature
        const [header, payload, signature] = token.split('.');

        // Base64 decode the payload
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload;
  }
  
  //send api call to backend with email contents
  const handleSendEmail=async()=>{
        console.log("********** handleSendEmail() ***********")
        let authToken=localStorage.getItem('token');
        console.log(authToken)
        let payload= getPayloadFromToken(authToken)
        console.log("payload : "+JSON.stringify(payload) )
        authToken="bearer "+authToken
        
        try {
          const response = await fetch('/email', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'authorization':authToken
              },
              body: JSON.stringify({ cc:payload.email, subject:subject, body:body })
          });

          if (response.ok) {
              const data = await response.json();
              console.log('API Response:', data);
          } 
          else {
              console.error('API Error:', response.statusText);
          }
        } 
        catch (error) {
            console.error('Fetch Error:', error);
        }

  }


  return (
    <Form>

      <Form.Group controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter email body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSendEmail}>
        Send
      </Button>
    </Form>
  );
};

export default EmailForm;
