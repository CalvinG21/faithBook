import { useState,useEffect  } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AddPublicPostForm = () => {
   
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    text: '',
    anonymous: '',
    authorId:""
  });

  useEffect(()=>{
    let authToken=localStorage.getItem('token');
    console.log(authToken)
    let payload= getPayloadFromToken(authToken)
    console.log("payload : "+JSON.stringify(payload) )
    authToken="bearer "+authToken
    let d=formData;
    d.authorId=payload._id
    setFormData(d)
    console.log(formData)
    console.log(payload["_id"])
  },[])


  let getPayloadFromToken=(token)=> {
        // Split the token into header, payload, and signature
        const [header, payload, signature] = token.split('.');

        // Base64 decode the payload
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
  }

  //handle all users inputted data to feilds
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let authToken=localStorage.getItem('token');
    let payload= getPayloadFromToken(authToken)
    console.log(value)
    name=="anonymous" ?
    (()=>{
      value=="false"?
      setFormData({ ...formData, [name]: payload.name })
      :
      setFormData({ ...formData, [name]: "anonymous" })
    })()
    :
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    //check if user inputs are valid
    if (form.checkValidity() === false ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    //alert(JSON.stringify(formData))
    // API call with fetch
    let authToken=localStorage.getItem('token');
      console.log(authToken)
      let payload= getPayloadFromToken(authToken)
      console.log("payload : "+JSON.stringify(payload) )
      authToken="bearer "+authToken
    
    try {
      const response = await fetch('/public/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization':authToken
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        //alert user that adding post was successful then nav back to home page!!!
        alert('Successfully added this post ;)')
        navigate("/home")

      } else {
        console.error('API Error:', response.statusText);
        //alert user that adding post was unsuccessful
        alert('Failed to add this post :(')
      }
    } catch (error) {
      alert('Failed to add this post :(')
      console.error('Fetch Error:', error);
    }
   };

  const handleBack = () => {
    navigate("/home"); 
  };

  return (
    <Container className="mt-5">
      <Row className="mt-1">
        <Col md={{ span: 1, offset: 1 }}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Form
            className="mt-5 p-3"
            style={{ backgroundColor: 'lightgrey' }}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group className="ms-0" as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Select Type of Post</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="type"
                  value={formData.postType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="PR">Prayer Request</option>
                  <option value="T">Testimony</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a type.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="formText">
                <Form.Label>Text (300 words max)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  maxLength={300}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a paragraph of fewer than 300 words.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="formAnonymous">
                <Form.Label>Remain Anonymous?</Form.Label>
                
                {[ 'radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Yes"
                      name="anonymous"
                      type={type}
                      id={`rb1`}
                    value={true}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="anonymous"
                      type={type}
                      id={`rb2`}
                      value={false}
                      onChange={handleInputChange}
                    />
                    
                  </div>
                ))}
              </Form.Group>
            </Row>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPublicPostForm;
