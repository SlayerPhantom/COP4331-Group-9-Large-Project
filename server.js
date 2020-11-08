const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.set('port', PORT);

const MongoClient = require('mongodb').MongoClient;

// has connection string for db
require('dotenv').config();
const url = process.env.MONGODB_URI;

const client = new MongoClient(url, { useNewUrlParser: true });
client.connect();

app.post('/api/createUser', async (req, res, next) =>
{
    // incoming: Username, Password, FirstName, LastName, Email
    // outgoing: error

    // TODO: add email verification
    const { username, password, fname, lname, email } = req.body;
    const newUser = { Username:username, Password:password, FirstName:fname, LastName:lname, Email:email };
    var error = '';

    try
    {
        const db = client.db();
        const result = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }
    var ret = { error:error }
    res.status(200).json(ret);
    
});

app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = '';
    const { username, password } = req.body;
    const db = client.db();
    const results = await db.collection('Users').find({Username:username, Password:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    if (results.length > 0)
    {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    else
    {
        error = 'Invalid user name/password';
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:error };
    res.status(200).json(ret);
});

app.post('/api/addevent', async (req, res, next) => 
{
    // incoming: userId, event time
    // outgoing: error

    const { userId, event } = req.body;
    const newEvent = {Event:event,UserId:userId};
    var error = '';

    try
    {
        const db = client.db();
        const result = db.collection('Schedule').insertOne(newEvent);
    }
    catch(e)
    {
        error = e.toString();
    }
    
    // eventList.push( event );
    var ret = { error:error }
    res.status(200).json(ret);
});

// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) =>
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () =>
{
    console.log('Server listening on port ${PORT}.');
});
