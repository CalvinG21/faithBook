import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

let DailyScripture=(props)=>{
    console.log(props.bibleChapter)
    let [bibleChapText1,setBibleChapText1]=useState(props.bibleChapter.texts)
    let [bibleChapAudio1,setBibleChapAudio1]=useState(props.bibleChapter.audio)
    let [bibleChapName1,setBibleChapName1]=useState(props.bibleChapter.bookName)
    let bibleChapter =useSelector((state)=>state.bibleChap.value)
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    //on start up get bible chapter frm backend
    useEffect(()=>{
      console.log("getBibleChapter()")
      getBibleChapter()
    },[])

    useEffect(()=>{
      //backend tx new bible chapter to frontend via ws, so now display new bible chapter #live update!!!
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
    
    //start/stop playing audio file
    let stopStartAudio=() => {
      console.log("stopStartAudio()")
      const audio = audioRef.current;
      if (audio.paused) {
          audio.play();
          //playButton.textContent = "Pause";
      } else {
          audio.pause();
          //playButton.textContent = "Play";
      }
      setIsPlaying(!isPlaying);
      console.log("isPlaying : "+isPlaying)
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
         
          //set the bible chap name, paragraph and audio path from response
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

      <div>
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title className='mb-5'>Daily Bible Reading</Card.Title>
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
                <h6>Click button below to play/pause audio:</h6>
                <audio id="audio" ref={audioRef} controls>
                  {bibleChapAudio1!=undefined || bibleChapAudio1!=null ? (
                    <source src={bibleChapAudio1} type="audio/mpeg" />
                  ) : (
                    <p>Your browser does not support the audio element.</p>
                  )}
                </audio>

            </div>
          {bibleChapAudio1!=undefined || bibleChapAudio1!=null ? (
                    <Button onClick={stopStartAudio} id="playButton">{isPlaying ? 'Pause' : 'Play'}</Button>
                  ) :(<p>No Bible Content Was Loaded!</p>)
          }      
        
          </Card.Body>
        </Card>
        <Helmet>
            <meta
              http-equiv="Content-Security-Policy"
              content="default-src 'self'; media-src https://2-us.com;"
            />
        </Helmet>
      </div>
   
  );
}

export default DailyScripture;