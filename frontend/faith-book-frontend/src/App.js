import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { Routes, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import SignUpForm from './components/SignUpForm';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import AddPublicPostForm from './components/AddPublicPostForm';
import EditPublicPostForm from './components/EditPublicPostForm';


function App() {
  return (
    <div className="App">
      {/*Since this component is out of the routes section then, Nav component will be present on all requests */}
          <NavBar></NavBar>
          
          {/* configure routes and what component is to be display when path requested  */}
          <Routes> 
            <Route path="/logout" element={<LoginForm formType={-1}></LoginForm>} />
              <Route path='/' element={<LoginForm formType={0}></LoginForm>}></Route>
              <Route path='/signUp' element={<SignUpForm></SignUpForm>}></Route>
              <Route path='/about' element={<AboutUs></AboutUs>}></Route>
              <Route path='/home' element={<Home></Home>}></Route>
              <Route path='/publicPost' element={<AddPublicPostForm></AddPublicPostForm>}></Route>
              <Route path='/editPublicPost/:userId' element={<EditPublicPostForm></EditPublicPostForm>}></Route>
          </Routes>
      
    </div>
  );
}

export default App;
