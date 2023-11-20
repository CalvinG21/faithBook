import Card from 'react-bootstrap/Card';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";


let DailyScripture=(props)=>{
  console.log(props.bibleChapter)
    let [bibleChapText1,setBibleChapText1]=useState(props.bibleChapter.texts)
    let [bibleChapAudio1,setBibleChapAudio1]=useState(props.bibleChapter.audio)
    let [bibleChapName1,setBibleChapName1]=useState(props.bibleChapter.bookName)
    let bibleChapter =useSelector((state)=>state.bibleChap.value)
    
   
    // bibleChapterText={bibleChapterText} bibleChapterAudio={bibleChapterAudio}
    useEffect(()=>{
      console.log("getBibleChapter()")

      getBibleChapter()
      
    },[])

    useEffect(()=>{
      console.log("bibleChapter redux update")
      console.log("bibleChapter : "+JSON.stringify(bibleChapter))
      bibleChapter.data.bookName!=undefined || bibleChapter.data.bookName!=null ?
       
       (()=>{
          console.log("bibleChapter : "+JSON.stringify(bibleChapter))
        setBibleChapAudio1(bibleChapter.data.audio)
            setBibleChapName1(bibleChapter.data.bookName.n +" Chapter:"+bibleChapter.data.bookName.chap)
            setBibleChapText1(bibleChapter.data.texts)
       })()
       :
       (()=>{
          console.log("bibleChapter : "+JSON.stringify(bibleChapter))
       })() 
      
      
    },[bibleChapter])
    

    let stopStartAudio=() => {
            if (audio.paused) {
                audio.play();
                playButton.textContent = "Pause";
            } else {
                audio.pause();
                playButton.textContent = "Play";
            }
    }        

     let getBibleChapter= async ()=>{
        try {
            let authToken="bearer "+localStorage.getItem('token');
            console.log(authToken)
            const response = await fetch('/dailyBibleChapter/', {
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
            console.log('Response data :) :', JSON.stringify(responseData));
            //alert(JSON.stringify(responseData.data.texts))

            const paragraph = responseData.data.texts.map(verse => `${verse.v}. ${verse.t}`).join('\n');
           console.log("paragraph : "+paragraph);
            
            //setBibleChapter({ ...bibleChapter, ["texts"]: paragraph })
            // setBibleChapText1({ ...responseData.data, texts: paragraph });

            setBibleChapAudio1(responseData.data.audio)
            setBibleChapName1(responseData.data.bookName.n +" Chapter:"+responseData.data.bookName.chap)
            setBibleChapText1(paragraph)
            console.log("responseData.data.audio : "+responseData.data.audio);
        }   
        catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title className='mb-5'>Daily Bible Chapter</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {bibleChapName1!=undefined || bibleChapName1!=null ? bibleChapName1 : "loading..." }
          </Card.Subtitle>
        <Card.Text>
           {bibleChapText1!=undefined || bibleChapText1!=null ? bibleChapText1 : "" }
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
      <Card.Body>
        <div>
            <h6>Click the button to play audio:</h6>

            
            <audio id="audio" controls>
              {bibleChapAudio1!=undefined || bibleChapAudio1!=null ? (
                <source src={bibleChapAudio1} type="audio/mpeg" />
              ) : (
                <p>Your browser does not support the audio element.</p>
              )}
            </audio>

        </div>
            
    <Button onClick={stopStartAudio} id="playButton">Play</Button>
      </Card.Body>
    </Card>
  );
}

export default DailyScripture;