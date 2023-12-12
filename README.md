## FaithBook

# Intro

FaithBook is a web application focusing on increasing and growing our users faith by providing features that promote daily devotional readings, as well as add their own or view the pblic posted prayer requests and testimonies of other users. Users can make public prayer request to the virtual prayer board where all users can view it or make personal prayer request just to the organization(And we will respond via email). This version will not be released to the public.

# System Architecture

A FullStack MERN Web App. Developed as a MVC application. The applications is composed of a backend and frontend.
The Backend's major components are:
1.Express Web server (Running in NodeJS).
2.Heroku Cloud to deploy the web app and host it to the internet.
3.Mongo DB being hosted as a remote database on Atlas.
The Frontend will be primarily built with React(create-react-app).
The Express App will be a proxy server to the React frontend, meaning that the frontend will communicate to the express app and based on the request, the express will then communicate to external servers/databases/endpoints for data. All communication to external servers/databases/endpoints will be handled by the express web server. Frontend only communicates to the Express App.
React source code will be built(as basic html and js files) once when express app is strated up and served up when the home/default routes is requested.
API Keys and passwords will be secure and not accessible to the public.
Database connection from express to mongo db will be handled by mongo db driver 'mongoose'.
Express will use Mongoose(Mongo db driver for nodeJs) to set up a "Change Stream" listner for real-time update notifactions on your mongo db collection.
Using a scheduling library to schedule the requesting for a new bible chapter text and audio track every day at 11.59 PM. For testing purposes , app will be updated with new bible chapter everyday at 11am, 12pm and 1pm aswell as 11.59pm.

# Functional Requirements

User Authentication

1. App should provide Users with option to either create accounts, Login, or logout.
2. Feature to reset their passwords.
3. Feature to recover password with email.
4. Login using their username & password or via Google and Facebook

User Authorization:

1. Hierarchy of user types (Admin, General User)
2. Role-based access control, allowing user to have different roles with varying levels of access. Example below:
   • Admin users can perform RUD (not CRUD) operations on user's posts(Testimonies and Prayer request) to the app public domain.
   • Admin users can enable /disable user CONTENT.
   • General users can only view the Public Prayer-request and Testimonies of other users.

Daily Bible Verse

1.Every Day the landing page will display a new bible (With Audio). Daily updates with new bible verses. Express backend has scheduler that is set to get a new bible chapter everyday at 11.59 pm and update the frontend with the new bible chapter.

Public Prayer-request and Testimonies

1. Users should can create new Testimonies/Public Prayer-request entities. (Description and privacy)
2. Users can edit existing their own Testimonies/Public Prayer-request, to update details.
3. Users can delete their Testimonies/Public Prayer-request
4. Users can view all publically posted Testimonies/Public Prayer-request. Users will be able to view real time data. Using Mongo DB shared streams enables the app to display updated data on the fly.
5. Users can filter on just their posts or view posts from all users.

Search and Navigation

1. Implement a Basic search.
2. User-friendly navigation to easily switch between home page,journaling Page or public posted testimonies and prayer requests

Non-Functional Requirements

Performance

1. The application should load quickly and be responsive, even with many tasks and users.
2. Optimize server-side and client-side performance to reduce latency.

Security

1. Ensure data encryption to protect user information and task details.
2. Guard against common security vulnerabilities (e.g., XSS, CSRF).

Reliability

1. High availability with minimal downtime for critical tasks.
2. Regular data backups and a disaster recovery plan.
3. The application should be able to scale as the user base grows.
4. Ensure cross-browser compatibility (e.g., Chrome, Firefox, Safari, Edge).
5. Compatibility with different operating systems and devices.

Usability

1. The user interface should be intuitive and user-friendly.
2. Support for multiple languages and accessibility standards.
3. Ability to integrate with third-party tools and services (e.g email, API).

\*When testing to see live updates between Admin users making changes to general users content Or to test test live updates between general users. Then try and login into web app on 2 seperate brower instances or 2 different browsers. See attached image

*Please use legit emails to ensure that you can see email communication between admin users.

# How to use the app as end General user

1.access the website : https://faithbook101-e17cd9d2f94b.herokuapp.com/
2.Create an account by signing up (click navbar link)
2.1.provide a username,email adressand password
3.login into your existing account
4.Laning on the home page ,you can :
4.1 Read a chapter of the bible(updated everyday at 11.59 pm)
4.2 check out the Prayer requests and testomonies of other users
4.3 add your own Prayer requests and testomonies
4.4 send a personal preyer request or seek advice on matter via our email support

# How to use the app as end Admin user

This version will not be released to the public.
1 access the website : https://faithbook101-e17cd9d2f94b.herokuapp.com/ 2. login with Admin creds below/ admin accounts are seeded in the database.
2.1 username : mrAdmin
2.2 password : Password1
2.3 Admins can view all users posts with the ability to edit the content of a post,suspend the post or perminently delete the post.
2.4 login to differnent user/ admin accounts in different browsers/ browser instances.

# How to use the app a developer(on local machine)

This version will not be released to the public.
1 checkout project from git
2.1 navigate to project root folder
2.2 run commands:
2.2.1 'cd fronted'
2.2.2 'cd faith-book-frontend'
2.2.3 'npm i'
2.3 nav back to root folder
2.4 run commands:
2.4.1 'cd backend'
2.4.2 'npm i'
2.5 create an .env file in your backend directory and add the following variables in file. Kindly note that .env file will not be provided in github codebase. .env file be present in my dropbox for reviewers and not to public!
2.5.1 X_RapidAPI_Key='24eaa05faa3mshc509b8103dd269ep1731e6jsnda75783619ba' //this is an example, sign up with rapidApi and get started
2.5.2 X_RapidAPI_Host="iq-bible.p.rapidapi.com" //this is an example, sign up with rapidApi and get started
2.5.3 mongoDbConnStr="mongodb+srv://calvin:test1234@cluster0.65qmcdz.mongodb.net/" //this is an example, sign up with mongo db atlas 
2.5.4 emailSupportName="calvinsg7777@gmail.com" //this is an example, sign up with gmail and get started
2.5.5 emailSupportPassword="dlah cchy mgkz isjd" //this is an example, sign up with gmail and get started
2.6 set up frontends proxy server to be express app running on your local machine. In frontend,go to package.json & update "proxy": "http://localhost:3000" or "proxy": "http://localhost:expressServerPort" . Depending if you launching frontend from react dev server or you building react and serving it from express server.
2.7 In the frontend's Home.js component, update line 28 so that web-socket connects to the express web server (ip address & port) on your local machine!

# Security

API Keys & Connection strings have been stored as environment variables on the heroku cloud.
For Local development I have provided my .env file in the dropbox folder containing all API Keys & Connection strings. Users Passwords have been salted and enncrypted when stored in the database & will be decrypted when confirming user authentication.

# 3rd Party APIs

Used Rapid API & IQ Bible API was used to get the daily bible chapter text and the audio track.
Mongo DB Changes streams to get notifications when any changes(CRUD events) are made to a collection on the mongo cloud.

# Deployment

The solution was deployed on heroku cloud. The frontend and backend both reside in one projectect folder on heroku.The design was a safe play to limit/lessen the unknown security risks that come with communications between components from seperate cloud platforms.
