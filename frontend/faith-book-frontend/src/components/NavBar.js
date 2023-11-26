import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  Link } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
// Importing the action creators we’ve implemented in our counter reducer.
import { reset,updateLoginUser } from '../redux/bibleVerseUpdateStore'

let NavBar=()=> {
let loggedIn =useSelector((state)=>state.bibleChap.value.isloggedin)
    const dispatch=useDispatch();
    console.log("navBar loggedIn : "+loggedIn)

    useEffect(()=>{
      //since redux store gets reset after a pager refresh!
      //check if jwt in local storage
      localStorage.getItem('token') != null ? 
      dispatch(updateLoginUser({loggedIn:true})):dispatch(reset())
      //if so then set redux store var loggedIn=true
      //else then set redux store var loggedIn=false
      window.addEventListener('beforeunload', ()=>{
        console.log("####### beforeunload  ");
        localStorage.removeItem('token');
      });

    },[loggedIn])

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