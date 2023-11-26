import { useState,useEffect  } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { json, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditPublicPostForm = () => {
    const navigate = useNavigate();

   const { userId } = useParams();
  console.log(JSON.stringify(userId))
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    
    title: '',
    text: ''
    
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

      userId!=undefined || userId!=null ?
      (()=>{
        console.log("(: id in url params")
        //get this post!!!
        getOnePost(userId)
      })()
      :
      (()=>{
        console.log("no id in url params")
      })()
      
      
  },[])


  let getPayloadFromToken=(token)=> {
        // Split the token into header, payload, and signature
        const [header, payload, signature] = token.split('.');

        // Base64 decode the payload
        const decodedPayload = JSON.parse(atob(payload));

        

        return decodedPayload;
  }

  

    const getOnePost=async(id)=>{
       let authToken=localStorage.getItem('token');
        console.log(authToken)
        let payload= getPayloadFromToken(authToken)
        console.log("payload : "+JSON.stringify(payload) )
        authToken="bearer "+authToken
        
        try {
        const response = await fetch('/public/'+id, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'authorization':authToken
            },
           
        });

        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
            setFormData({ ...formData, title: data.post.title, text: data.post.text })
            //  setFormData({ ...formData, text: data.post.text })
            
        } else {
            console.error('API Error:', response.statusText);
        }
        } catch (error) {
            console.error('Fetch Error:', error);
        }

    }


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
      const response = await fetch('/public/'+userId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization':authToken
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        alert('Successfully updated this post ;)')
        navigate("/home")
      } 
      else {alert('Failed to update this post :(')
        console.error('API Error:', response.statusText);
        
      }
    } catch (error) {
        alert('Failed to update this post :(')
      console.error('Fetch Error:', error);
    }
   };

  const handleBack = () => {
    navigate("/home"); 
  };

  return (
    <Container className="mt-5">
      <Row className="mt-1">
        <Col md={{ span: 1, offset: 0 }}>
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
                  Please update text with a paragraph of fewer than 300 words.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
           
            <Button type="submit">Update</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPublicPostForm;
