let express=require('express');
let app = express();
let cors=require('cors');
let userRouter=require('./routes/userRoutes')
let publicPostsRouter=require('./routes/publicPostRoutes')
let PublicPosts=require('./models/publicPostsModels');
const http = require('http');
const mongoose = require('mongoose');
let helmet =require("helmet");
const axios = require('axios');
const path = require('path');
const cron = require('node-cron');
let emailrouter=require('./routes/emailRoutes')
let cachedData = {};
const booksOfBible=require('./libBooksOdBible');
const dotenv = require('dotenv');
dotenv.config();

//console.log(booksOfBible)
if (process.env.NODE_ENV === 'production') {
    console.log(__dirname);
    let frontendPath = path.join(__dirname, 'build');
    console.log(frontendPath);
    app.use(express.static(frontendPath));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
        console.log("hava hava");
    });
}
else
{
  console.log(__dirname);
    let frontendPath = path.join(__dirname, 'build');
    console.log(frontendPath);
    app.use(express.static(frontendPath));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
        console.log("hava hava");
    });
}


/*Note that Heroku cloud zone is 2 hours behind us */

// Schedule the task to run every day at 11 15 AM
cron.schedule('20 23 * * *', async () => { 
  try {
    getDailyBibleChapter()
  } 
  catch (error) {
    console.error('Error fetching data:', error.message);
  }
});

// Schedule the task to run every day at 12 17 AM
cron.schedule('22 23 * * *', async () => { 
  try {
    getDailyBibleChapter()
  } 
  catch (error) {
    console.error('Error fetching data:', error.message);
  }
});

// Schedule the task to run every day at 14 20 AM
cron.schedule('39 22  * * *', async () => { 
  try {
    getDailyBibleChapter()
  } 
  catch (error) {
    console.error('Error fetching data:', error.message);
  }
});

// Schedule the task to run every day at 11 59 PM
cron.schedule('37 20 * * *', async () => { 
  try {
    getDailyBibleChapter()
  } 
  catch (error) {
    console.error('Error fetching data:', error.message);
  }
});

let getDailyBibleChapter=async(sendToFrontend=true)=>{
  console.log("getDailyBibleChapter() ")
  const apiHeaders={
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,//'4eaa05faa3mshc509b8103dd269ep1731e6jsnda75783619ba',
        'X-RapidAPI-Host': process.env.X_RapidAPI_Host,//'iq-bible.p.rapidapi.com'
      }
  const options = {
      method: 'GET',
      url: 'https://iq-bible.p.rapidapi.com/GetRandomChapter',
      params: {versionId: 'kjv'},
      headers: apiHeaders
  };
  const options2 = {
      method: 'GET',
      url: 'https://iq-bible.p.rapidapi.com/GetAudioNarration',
      params: {
        bookId: '',
        chapterId: '',
        versionId: 'kjv'
      },
      headers: apiHeaders
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    //save data locally for future requests
    cachedData.texts=response.data;
    cachedData.bookName=booksOfBible[Number(response.data[0].b)]
    cachedData.bookName.chap=response.data[0].c
    //send update 
    
   options2.params.bookId=response.data[0].b
   options2.params.chapterId=response.data[0].c

	const response2 = await axios.request(options2);
	//console.log(response2.data);
    cachedData.audio=response2.data.fileName;

    if(sendToFrontend){
        if (io.sockets.sockets.size > 0) {
       //console.log('cachedData : '+JSON.stringify(cachedData));
       console.log('ws tx 22222222222222');
       io.emit('bibleChapterUpdate', cachedData);
       console.log('ws tx bibleChapterUpdate');
     } else {
       console.log('No connected clients');
     }
    
    }
     
     

  } catch (error) {
    console.error(error);
  }
}

//global midleware
app.use(express.json())
app.use(cors())

//Helmet helps secure Express apps by setting HTTP response headers.
// Use Helmet!
app.use(helmet());

//mount the router for users to requests with url path begining with '/user'
app.use('/user',userRouter)
app.use('/public/',publicPostsRouter)
app.use('/email',emailrouter)


const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    //origin: 'http://10.0.0.149:3000',
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

//routes

app.get("/dailyBibleChapter",(req,res)=>{ 
    //once react app is built as (html,js and css), serve the react app index.hmtl webpage on this route
    res.status(200).json({ data: cachedData });
})

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, 'build/index.html'));  
})

//mongoose driver set up : connect to remote mongoo db
mongoose.Promise = global.Promise;

// Connect to MongoDB using Mongoose
mongoose.connect( process.env.mongoDbConnStr, {
    //useMongoClient: false,
dbName: 'faithBook', // Connect to the faithbook database.
useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//listen for any changes made to the PublicPosts collection located on mongo cloud db!!! change streams!!! 
PublicPosts.watch().
on('change', (data) => {
     console.log("mongo db live updates : "+JSON.stringify(data))
     
      const lastWeekTimestamp = new Date();
      lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 365); // Subtract 365 days
      PublicPosts
      .find({ updatedAt: { $gt: lastWeekTimestamp } })
      .limit(50) // Limit the result to 50 documents
      .exec()
      .then((response)=>{
          console.log("mongoDb Live Update !!!!!!!!!!!!!!!!!")
          
          if (io.sockets.sockets.size > 0) {
             // Send data for route1 to connected clients
             io.emit('mongoDbLiveUpdate', response);
             console.log('ws tx mongoDbLiveUpdate');
          } else {
            console.log('No connected clients');
          }
      })
      .catch((err)=>{
          console.log('change streams error : '+JSON.stringify(err));
      })
});


//first time set up for cached data
getDailyBibleChapter(false)

//app to listen for incoming http requests on port
const PORT = process.env.PORT || 3001;
const HOST = '10.0.0.149'; //192.168.0.174 //10.0.0.149

server.listen(PORT,  () => {
    console.log(`express web application NOW running on http://:${PORT}`);
});
