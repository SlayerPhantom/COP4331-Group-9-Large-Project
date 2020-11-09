npm install nodemailer;
import React, {useState} from 'react';
//new
const nodemailer = require('nodemailer');

function CreateUser()
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

    var username;
    var password;
    var confirmPassword;
    var fname;
    var lname;
    var email;
    const [message,setMessage] = useState('');

    const createUser = async event => 
    {
        event.preventDefault();
        
        var obj = {username:username.value, password:password.value, fname:fname.value, lname:lname.value, email:email.value, confirmPassword:confirmPassword.value}
        var js = JSON.stringify(obj);

        try
        {
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
    };
    //new
    let transporter = nodemailer.createTransport
    ({
        service: 'gmail',
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
    
    function doVerify()
    {
        transporter.sendMail( mail, function( err, data )
        {
            if( err )
            {
                console.log('An error has occured');
            }
            else
            {
                console.log('The mail was sent!');
            }
        });
    }
    
    //end new
    //changed onClick; added onclick{doVerify}
    return(
        <div id="accessUIDiv">
            <br />
            <span id ="inner-title">Create Account</span><br />
            <input type="text" id="fname" placeholder="First Name" ref={(c) => fname = c} /><br />
            <input type="text" id="lname" placeholder="Last Name" ref={(c) => lname = c} /><br />
            <input type="text" id="email" placeholder="Email" ref={(c) => email = c} /><br />
            <input type="text" id="username" placeholder="Username To Add" ref={(c) => username = c} /><br />
            <input type="password" id="password" placeholder="Password" ref={(c) => password = c} /><br />
            <input type="password" id="confirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} /><br />
            <button type="button" id="createUserButton" class="buttons" onClick={createUser} onClick={doVerify}> Create User </button><br />
            <span id="userAddResult">{message}</span>
        </div>
    );
};

export default CreateUser;
