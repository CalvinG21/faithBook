// LiveDataDisplay.js
import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import {   Col, Row ,} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from "react-redux";

const LiveDataDisplay = (props) => {
  
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [justMydata, setJustMydata] = useState(false);
   //let { liveData,userData }=props; 
   let liveData=useSelector((state)=>state.testAndPrayerReqs.value.data)
  useEffect(() => {
    // Update the state when new live data is received
    setData(liveData);
  }, [liveData]);

const showFunc = (userPayload,display=true) => {
    // Your logic to determine whether to show or hide the button
    let isAuthor= userPayload.authorId==userData._id;
    console.log("authId "+userPayload)
    console.log("userData._id "+userData._id)
    if(userData.role!="general")
    {
        return ''
    }
    else{
        return display==true?
       isAuthor ? '' : 'none'
    :
     isAuthor ? 'none' : ''   

    }
       
};

const navToPubPostForm=(authorId=0)=>{
    console.log("???????????? "+authorId)    
    authorId==0?
        
         navigate("/publicPost")
         :
        navigate("/editPublicPost/"+authorId)
}

let getPayloadFromToken=(token)=> {
        // Split the token into header, payload, and signature
        const [header, payload, signature] = token.split('.');

        // Base64 decode the payload
        const decodedPayload = JSON.parse(atob(payload));

        

        return decodedPayload;
  }
const deleteItem = (itemId) => {
    // Display confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete this item?");
    let authToken=localStorage.getItem('token');
        console.log(authToken)
        let payload= getPayloadFromToken(authToken)
        console.log("payload : "+JSON.stringify(payload) )
        authToken="bearer "+authToken
    // Check user's response
    if (userConfirmed) {
       //delete using fetch
        fetch('/public/'+itemId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization':authToken
            },
            
        })
        .then(response => {
            if (!response.ok) {
                alert('Failed to delete this post :(')
            }
            alert('Successfully deleted this post :)')
            // Handle successful delete here
        })
        .catch(error => {
            console.error('Error during deletion:', error);
            alert('Failed to delete this post :(')
            // Handle error, show a message to the user
        });
    } else {
        // User clicked "Cancel" or closed the dialog - do nothing
    }
};

const suspendItem = (itemId,sus=false) => {
    sus=!sus;
    // Display confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to suspend this item?");
    let authToken=localStorage.getItem('token');
        console.log(authToken)
        let payload= getPayloadFromToken(authToken)
        console.log("payload : "+JSON.stringify(payload) )
        authToken="bearer "+authToken
    // Check user's response
    if (userConfirmed) {
       //delete using fetch
        fetch('/public/suspend/'+itemId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization':authToken
            },
            body: JSON.stringify({suspended:sus}),
            
        })
        .then(response => {
            if (!response.ok) {
                alert('Failed to suspend this post :(')
            }
            alert('Successfully suspended this post :)')
            // Handle successful delete here
        })
        .catch(error => {
            console.error('Error during deletion:', error);
            alert('Failed to suspend this post :(')
            // Handle error, show a message to the user
        });
    } else {
        // User clicked "Cancel" or closed the dialog - do nothing
    }
};


let formatDateTime=(utcTimestamp)=> {
  const date = new Date(utcTimestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    //timeZoneName: 'short'
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}
const handleSelect = (selectedValue) => {
    selectedValue == "me" ?
    setJustMydata(true)
    :
    setJustMydata(false) 

  };

  return (
    <div>
      <h2>Prayer Requests & Testimonies</h2>
      <p>
            View the prayer requests and tesomonies of other users. Share in their prayer life and remember their needs in prayer. Checkout all the testomonies and boost your faith by reading through what GOD is doing in the life of fellow believers 
      </p>
       <Row className='mb-2' style={{display:userData.role!="general"?"none":""}}>
              <Col md={{ span: 2, offset: 1 }}>
                     <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Filter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="all">All</Dropdown.Item>
                            <Dropdown.Item eventKey="me">Just mine</Dropdown.Item>
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Col> 
               
        </Row>
        <Row className='mb-2' style={{display:userData.role!="general"?"none":""}}>
              <Col md={{ span: 10, offset: 1 }}>
                    <Button variant='success' onClick={()=>{
                        console.log("ad new $$$$$$$$$$$$")
                        navToPubPostForm()
                    }}>Add New</Button>
                </Col> 
               
        </Row>
      <ListGroup>
        {console.log(data)}
        {liveData.filter(item => {
                // Use filter if filterValue is not null; otherwise, return all items
                return  justMydata== true ? item.authorId==userData._id : true;
        }).slice().reverse().map((item, index) => (
            <ListGroup.Item key={index} style={{textAlign:'left',display: userData.role=="general"&&item.suspended?"none":""}}>
                
                <h5><span style={{color:item.type=="PR"? "darkgreen" : "darkblue"}} >{item.type=="PR"? "Prayer Request : " : "Testimony : "}</span> {item.title}</h5>
                <h6 style={{color:"grey"}}>Author:{item.authorId==userData._id?"Me": item.anonymous}</h6>
                <h6 style={{color:"grey"}}> Posted: {formatDateTime(item.updatedAt)}</h6>
                <p>{item.text}</p>
                {/* <p><small>likes:{item.likes}</small></p>
                
                <Button style={{display:showFunc(item,false)}} variant="primary" >Like</Button>{' '} */}
                <Button style={{display:showFunc(item)}} variant="secondary" onClick={()=>{navToPubPostForm(item._id)}}>Edit</Button>{' '}
                <Button style={{display:showFunc(item)}} variant="danger" onClick={()=>{deleteItem(item._id)}}>remove</Button>{' '}
                <Button style={{display:userData.role=="general"?"none":""}} variant="primary" onClick={()=>{suspendItem(item._id,item.suspended)}} >{item.suspended?"Un-Suspend":"Suspend"}</Button>{' '}
            </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default LiveDataDisplay;
