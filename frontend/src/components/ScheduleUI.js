import React, {useState} from 'react';

function ScheduleUI()
{
    const app_name = 'group9-meetingscheduler'
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

    var event = '';
    const [message,setMessage] = useState('');
    const [eventList,setEventList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const addEvent = async event => 
    {
        event.preventDefault();

        var obj = { userId:userId,event:event.value };
        var js = JSON.stringify(obj);
        
        try
        {
            const response = await fetch(buildPath('api/addcard'),
            {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);

            if(res.error.length > 0)
            {
                setMessage("API Error:" + res.error);
            }
            else
            {
                setMessage('Card has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };

    return(
        <div id="accessUIDiv">
            <br />
            <input type="text" id="eventText" placeholder="Event To Add" ref={ (c) => event = c} />
            <button type="button" id="addEventButton" class="buttons" onClick={addEvent}> Add Event </button><br />
            <span id="eventAddResult">{message}</span>
        </div>
    );
}

export default ScheduleUI;