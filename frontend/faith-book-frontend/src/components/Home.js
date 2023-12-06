import { Form, Button, Col, Row ,Container} from 'react-bootstrap';
import DailyScripture from './DailyScripture';
import LiveDataDisplay from './LiveDataDisplay';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import EmailFormModal from './EmailFormModal'; // Adjust the path

// Importing the action creators we’ve implemented in our counter reducer.
import { updateBibleChapter } from '../redux/bibleVerseUpdateStore'
import { updateTestAndPrayerReqs } from '../redux/testomoniesAndPrayerReqs'
import EmailForm from './EmailForm';


let Home=()=>{
    const [liveData, setLiveData] = useState([]);
    const [bibleChapter, setBibleChapter] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
    
    // Initial dummy data
    var HOST = location.origin.replace(/^http/, 'ws');
    const socket = io(HOST);//use this for heroku deployment   //http://10.0.0.149:3001
     //const socket = io("http://localhost:3001"); 
    //process.env.REACT_APP_SERVER_URL
    useEffect(() => {
        socket.on('mongoDbLiveUpdate', (data) => {
           //alert("New Mongo update "+JSON.stringify(data))
            //setLiveData(data)
            dispatch(updateTestAndPrayerReqs({testAndPrayerReqs:data}))
            console.log("mongoDbLiveUpdate data : "+data)
        });

        socket.on('bibleChapterUpdate', (data) => {
           //alert("New Mongo update "+JSON.stringify(data))
            //setBibleChapter(data)
           

            console.log(JSON.stringify(data.texts))

            // Concatenate verses fields to form a paragraph
            const paragraph = data.texts.map(verse => `${verse.v}. ${verse.t}`).join('\n');
           console.log("paragraph : "+paragraph);
            
            //setBibleChapter({ ...bibleChapter, ["texts"]: paragraph })
            dispatch(updateBibleChapter({bibleChap:{ ...data, texts: paragraph }}));
            
            
            //alert(JSON.stringify(data))
            console.log(JSON.stringify(data))
        });

        // Set the initial dummy data
        //setLiveData(initialData);
          getAllPublicPosts()
        // Add 2 more units of dummy data after 30 seconds
        let authToken=localStorage.getItem('token');
        console.log(authToken)
        let payload=null;
        if(authToken!=null)
        {
            payload=getPayloadFromToken(authToken)
            setUserData(payload)
        }
        else{
            //handle if no jwt auth token
            console.log("No JWT Token present!")
        }

    }, []);

    let navToAddNewPubPostForm=()=>{
        //navigate("/publicPost")
    }

    let getAllPublicPosts= async ()=>{
        try {
            let authToken="bearer "+localStorage.getItem('token');
            console.log(authToken)
            const response = await fetch('/public/', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'authorization':authToken
                // Add any other headers as needed
                },
                //body: JSON.stringify({ username, password, email }),
            });

            if (!response.ok) {
                // Handle error cases
                console.error('Failed to fetch data:', response.statusText);
                return;
            }

            // Handle success cases
            const responseData = await response.json();
            console.log('Response data:', JSON.stringify(responseData));
            //alert(JSON.stringify(responseData))
            //setLiveData(responseData.posts)
            dispatch(updateTestAndPrayerReqs({testAndPrayerReqs:responseData.posts}))
            // Store the token in local storage
            //localStorage.setItem('token', response.token);
            //navigate("/about");
        } 
        catch (error) {
            console.error('Error:', error.message);
        }
    }

    let getPayloadFromToken=(token)=> {
        // Split the token into header, payload, and signature
        const [header, payload, signature] = token.split('.');

        // Base64 decode the payload
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload;
    }

    return(<>
        <Container className='mt-5'>
            <header>
                <h1 style={{color:'#001a4d'}}>FaithBook</h1>
            </header>
            <Row className='mt-2'>
                <Col md={{ span: 8, offset: 2 }}>
                     <p>
                        Welcome to FaithBook, where faith and community come together. 
                        On our home page, you'll find a daily Bible reading section with audio for those who prefer listening over reading. 
                        Scroll through the list of prayer requests and testimonies shared by users like you. 
                        This section gets refreshed for the month, fostering a sense of community and shared spirituality.

                        Additionally, we provide a personal help line for you to send messages to our team for prayer and guidance.
                        Our team receives your messages via email and responds as promptly as possible.

                        Thank you for being a part of our FaithBook community, a Christian website dedicated to fostering connections,
                        providing support, and sharing in the journey of faith. Stay Blessed!
                    </p>
                </Col>
            </Row>
           

            <Row className='mt-5'style={{display: userData.role!="general"?"none":""}}>
                <Col md={{ span: 10, offset: 1 }}>
                    <DailyScripture bibleChapter={bibleChapter}></DailyScripture>
                </Col>
            </Row>
            <Row className='mt-5'>
                {/* <Col md={{ span: 10, offset: 1 }}>
                    <Button variant='success' onClick={navToAddNewPubPostForm}>Add New</Button>
                </Col> */}
                <Col md={{ span: 10, offset: 1 }}>
                    <LiveDataDisplay userData={userData} liveData={liveData}></LiveDataDisplay>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={{ span: 6, offset: 3 }}>
                    <h6>
                        Need some advice , want to share with us your personal story or need our support team to pray with you? ... Feel free to get in touch with us
                    </h6>                
                </Col>
                <Col md={{ span: 6, offset: 3 }}>
                        {/* <EmailForm></EmailForm> */}
                        <Button variant="primary" onClick={handleOpenModal}>
                            Email Us
                        </Button>

                        <EmailFormModal showModal={showModal} handleClose={handleCloseModal} />
                </Col>
            </Row>
        </Container>
    </>)
}

export default Home;