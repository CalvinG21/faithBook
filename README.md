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

For Local development I have provided my .env file in the dropbox folder containing all API Keys & Connection strings. Users Passwords have been salted and encrypted when stored in the database & will be decrypted when confirming user authentication.
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
No file chosen
Attach files by dragging & dropping, selecting or pasting them.
Editing faithBook/README.md at main · CalvinG21/faithBook
