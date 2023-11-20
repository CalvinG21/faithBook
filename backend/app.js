let middleware=require('./routes/middleware')
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

let cachedData = {};

//most api providers use this structure, maintainance required!!!
const booksOfBible =[
  {
    "b": "1",
    "n": "Genesis"
  },
  {
    "b": "2",
    "n": "Exodus"
  },
  {
    "b": "3",
    "n": "Leviticus"
  },
  {
    "b": "4",
    "n": "Numbers"
  },
  {
    "b": "5",
    "n": "Deuteronomy"
  },
  {
    "b": "6",
    "n": "Joshua"
  },
  {
    "b": "7",
    "n": "Judges"
  },
  {
    "b": "8",
    "n": "Ruth"
  },
  {
    "b": "9",
    "n": "1 Samuel"
  },
  {
    "b": "10",
    "n": "2 Samuel"
  },
  {
    "b": "11",
    "n": "1 Kings"
  },
  {
    "b": "12",
    "n": "2 Kings"
  },
  {
    "b": "13",
    "n": "1 Chronicles"
  },
  {
    "b": "14",
    "n": "2 Chronicles"
  },
  {
    "b": "15",
    "n": "Ezra"
  },
  {
    "b": "16",
    "n": "Nehemiah"
  },
  {
    "b": "17",
    "n": "Esther"
  },
  {
    "b": "18",
    "n": "Job"
  },
  {
    "b": "19",
    "n": "Psalms"
  },
  {
    "b": "20",
    "n": "Proverbs"
  },
  {
    "b": "21",
    "n": "Ecclesiastes"
  },
  {
    "b": "22",
    "n": "Song of Solomon"
  },
  {
    "b": "23",
    "n": "Isaiah"
  },
  {
    "b": "24",
    "n": "Jeremiah"
  },
  {
    "b": "25",
    "n": "Lamentations"
  },
  {
    "b": "26",
    "n": "Ezekiel"
  },
  {
    "b": "27",
    "n": "Daniel"
  },
  {
    "b": "28",
    "n": "Hosea"
  },
  {
    "b": "29",
    "n": "Joel"
  },
  {
    "b": "30",
    "n": "Amos"
  },
  {
    "b": "31",
    "n": "Obadiah"
  },
  {
    "b": "32",
    "n": "Jonah"
  },
  {
    "b": "33",
    "n": "Micah"
  },
  {
    "b": "34",
    "n": "Nahum"
  },
  {
    "b": "35",
    "n": "Habakkuk"
  },
  {
    "b": "36",
    "n": "Zephaniah"
  },
  {
    "b": "37",
    "n": "Haggai"
  },
  {
    "b": "38",
    "n": "Zechariah"
  },
  {
    "b": "39",
    "n": "Malachi"
  },
  {
    "b": "40",
    "n": "Matthew"
  },
  {
    "b": "41",
    "n": "Mark"
  },
  {
    "b": "42",
    "n": "Luke"
  },
  {
    "b": "43",
    "n": "John"
  },
  {
    "b": "44",
    "n": "Acts"
  },
  {
    "b": "45",
    "n": "Romans"
  },
  {
    "b": "46",
    "n": "1 Corinthians"
  },
  {
    "b": "47",
    "n": "2 Corinthians"
  },
  {
    "b": "48",
    "n": "Galatians"
  },
  {
    "b": "49",
    "n": "Ephesians"
  },
  {
    "b": "50",
    "n": "Philippians"
  },
  {
    "b": "51",
    "n": "Colossians"
  },
  {
    "b": "52",
    "n": "1 Thessalonians"
  },
  {
    "b": "53",
    "n": "2 Thessalonians"
  },
  {
    "b": "54",
    "n": "1 Timothy"
  },
  {
    "b": "55",
    "n": "2 Timothy"
  },
  {
    "b": "56",
    "n": "Titus"
  },
  {
    "b": "57",
    "n": "Philemon"
  },
  {
    "b": "58",
    "n": "Hebrews"
  },
  {
    "b": "59",
    "n": "James"
  },
  {
    "b": "60",
    "n": "1 Peter"
  },
  {
    "b": "61",
    "n": "2 Peter"
  },
  {
    "b": "62",
    "n": "1 John"
  },
  {
    "b": "63",
    "n": "2 John"
  },
  {
    "b": "64",
    "n": "3 John"
  },
  {
    "b": "65",
    "n": "Jude"
  },
  {
    "b": "66",
    "n": "Revelation"
  }
] 

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

// if (process.env.NODE_ENV === 'production') {
//     console.log(__dirname);
//     let p=path.join(__dirname, 'build')
//     console.log(p)
//     app.use(express.static(p));

//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, 'build/index.html'));
//         console.log("hava hava");
//     });
// }


// Schedule the task to run every day at 11 59 PM
cron.schedule('59 23 * * *', async () => { 
  try {
    getDailyBibleChapter()

   
  } catch (error) {
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
    console.log(response.data);
    //save data locally for future requests
    cachedData.texts=response.data;
    cachedData.bookName=booksOfBible[Number(response.data[0].b)]
    cachedData.bookName.chap=response.data[0].c
    //send update 
    
   options2.params.bookId=response.data[0].b
   options2.params.chapterId=response.data[0].c

	const response2 = await axios.request(options2);
	console.log(response2.data);
    cachedData.audio=response2.data.fileName;

    if(sendToFrontend){
        if (io.sockets.sockets.size > 0) {
       console.log('cachedData : '+JSON.stringify(cachedData));
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

//first time set up for cached data
getDailyBibleChapter(false)

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    //origin: 'http://10.0.0.149:3000',
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

//global midleware
app.use(express.json())
app.use(cors())

//Helmet helps secure Express apps by setting HTTP response headers.
// Use Helmet!
app.use(helmet());

//mount the router for users to requests with url path begining with '/user'
app.use('/user',userRouter)
app.use('/public/',publicPostsRouter)

//routes
app.get("/test",(req,res)=>{ 
    //once react app is built as (html,js and css), serve the react app index.hmtl webpage on this route
    res.status(200).json({ data: 'successfully requested the home page' });
})

app.get("/dailyBibleChapter",(req,res)=>{ 
    //once react app is built as (html,js and css), serve the react app index.hmtl webpage on this route
    res.status(200).json({ data: cachedData });
})

// app.get("*",(req,res)=>{
//      res.status(404).json({ data: 'Resource not found' });
// })

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, 'build/index.html'));   
  //res.status(404).json({ data: 'Resource not found' });
})



//mongoose driver set up : connect to remote mongoo db
mongoose.Promise = global.Promise;

// Connect to MongoDB using Mongoose
//mongoose.connect('mongodb+srv://calvinTest:test123@cluster0.65qmcdz.mongodb.net/', {
mongoose.connect( process.env.mongoDbConnStr, {
    //useMongoClient: false,
dbName: 'faithBook', // Connect to the Blogs database.
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


     PublicPosts.watch().
     on('change', (data) => {
          console.log("mongo db live updates : "+JSON.stringify(data))
          
           const lastWeekTimestamp = new Date();
                lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 7); // Subtract 7 days
          PublicPosts.find({ updatedAt: { $gt: lastWeekTimestamp } })
                .limit(50) // Limit the result to 50 documents
                .exec()
                .then((response)=>{
                  console.log("mongoDbLiveUpdate !!!!!!!!!!!!!!!!!")
                    //console.log(response)
                    //socket.emit('mongoDbLiveUpdate', response);
                    if (io.sockets.sockets.size > 0) {
                       console.log('ws tx 11111111');
                      // Send data for route1 to connected clients
                     io.emit('mongoDbLiveUpdate', response);
                       console.log('ws tx mongoDbLiveUpdate');
                    } else {
                      console.log('No connected clients');
                    }
                })
                .catch((err)=>{

                })

     });






//app to listen for incoming http requests on port
const PORT = process.env.PORT || 3001;
const HOST = '10.0.0.149'; //192.168.0.174 //10.0.0.149

server.listen(PORT,  () => {
  console.log(`express web app running on http://:${PORT}`);
  

});