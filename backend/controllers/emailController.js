const nodemailer = require('nodemailer');
require('dotenv').config();
const express = require('express');

// Admin SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with the SMTP server for the admin's email
  port: 587,
  secure: false, // Set to true if using a secure connection (e.g., SSL/TLS)
  auth: {
    user: process.env.emailSupportName,
    pass: process.env.emailSupportPassword//admin's email password
  },
});

exports.sendEmail=async(req,res)=>{
    console.log("emailController : sendEmail()")
    try {
        console.log("attempting to send email")
        console.log('req.body : '+JSON.stringify(req.body))
        const mailOptions = {
            from: 'calvinsg777@gmail.com',
            to: 'calvinsg777@gmail.com',
            cc: "calvin.govindsamy@mediaverge.co.za", // req.body.cc, // CC recipient
            subject: req.body.subject,
            text: req.body.body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("jaaaa")
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        res.status(200).send({"success":"sent email out"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"errorz":error})   
    }
}