import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  Link } from "react-router-dom";
import { useSelector } from "react-redux";

let NavBar=()=> {
  let loggedIn =useSelector((state)=>state.bibleChap.value.isloggedin)
    console.log("navBar loggedIn : "+loggedIn)
  return (
    <>
      {[ 'xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3"  bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#">FaithBook.com</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link style={{display:loggedIn==true ? "":'none'}} to="/home" className='mx-1'>Home</Link>
                  <Link to="/about" className='mx-1'>About Us</Link>
                  <Link style={{display:loggedIn==false ? "":'none'}} to="/" className='mx-1'>Login</Link>
                  <Link style={{display:loggedIn==false ? "":'none'}} to="/signUp" className='mx-1'>Sign In</Link>
                  <Link style={{display:loggedIn==true ? "":'none'}} to="/logout" className='mx-1'>Logout</Link>
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;