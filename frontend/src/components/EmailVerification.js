import React, {useState} from 'react';
const nodemailer = require('nodemailer');

function verify()
{
    let transporter = nodemailer.createTransport
    ({
        service: 'gmail'
        auth:
        {
            user: 'group9scheduler@gmail.com',
            pass:'cop4331$',
        },
    });


    let mail = 
    {
        from: 'group9scheduler@gmail.com',
        to: 'loganrod16@gmail.com',
        subject: 'Email Verification',
        text: 'TEST'
    }
    
    function doVerify()
    {
        transporter.sendMail( mail, function( error, data ) )
        {
        if( error == true )
        {
            console.log('An error has occured');
        }
        else
        {
            console.log('The mail was sent!');
        }

    }
    
}
