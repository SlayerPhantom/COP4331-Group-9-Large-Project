import React, {useState} from 'react';

function Login()
{    
    const app_name = 'schedule9'
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

    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        console.log("Hello, I am logged in. It's working. Can you see me?");
        
        event.preventDefault();
        var obj = {username:loginName.value,password:loginPassword.value}
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.id <= 0)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/scheduler';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id ="inner-title">Please Login!</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={ (c) => loginName = c} /><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={ (c) => loginPassword = c} /><br />
                <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
