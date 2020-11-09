import React, {useState} from 'react';
const nodemailer = require('nodemailer');

function verify()
{
    const app_name = 'group9-meetingscheduler';
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    
    var email;
    
    let transporter = nodemailer.createTransport
    ({
        service: 'gmail'
        auth:
        {
            user: 'group9scheduler@gmail.com',
            pass:'cop4331$'
        }
    });


    let mail = 
    {
        from: 'group9scheduler@gmail.com',
        to: 'loganrod16@gmail.com',
        subject: 'Email Verification',
        text: 'TEST'
    };
    
    const doVerify = async event => 
    {
        event.preventDefault();
        
        var obj = { email:email.value }
        var js = JSON.stringify(obj);
        
        try
        {
            // Continue editing here
            const response = await fetch(buildPath('api/createUser'),
            {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);

            if(res.error.length > 0)
            {
                setMessage("API Error:" + res.error);
            }
            else
            {
                setMessage('User has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    }
