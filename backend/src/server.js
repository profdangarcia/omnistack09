//import the dependency
const express = require('express');
//import mongoose for mongodb procedures
const mongoose = require('mongoose');
//import cors the permit external access
const cors = require('cors');
//import path to deal with paths
const path = require('path');
//import socketio to deal with real time
const socketio = require('socket.io');
//import http
const http = require('http');

//when importing files requires relative path to it
const routes = require('./routes');

//create the app object
const app = express();
//separate server from express
const server = http.Server(app);
//making server able to listen to websocket protocol
const io = socketio(server);




//connection to mongodb using mongoose
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistackclass-wdihm.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//the best way of doing this should be using a simple database service 
const connectedUsers = {};

//we want to keep information about the users who connect on our app
io.on('connection', socket => {

    //we get the user_id info sent by the frontend in a query
    const { user_id } = socket.handshake.query;
    //relating the user_id with his connection id inside the object
    connectedUsers[user_id] = socket.id;


    //example of sending data to client
    // setTimeout(() => {
    //     socket.emit('hello', 'World');
    // }, 4000);

    //example receiving data from client
    // socket.on('omni', data => {
    //     console.log(data);
    // });
});

//this use() has to be the first one so it can pass to the others the connectedUsers object
app.use((req, res, next) => {
    //here, every route will now have access to the io so it can receive and send messages
    //and will have access to the connectedUsers object
    req.io = io;
    req.connectedUsers = connectedUsers;

    //this will prevent the app to stop here
    return next();
});

//activate cors, its possible to configure cors passing an object like cors({origin: ''})
app.use(cors());
//define json as possible request for express
app.use(express.json());
//using path
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
//using the routes from file (must be after express.json())
app.use(routes);


//routes have been moved to routes.js file

server.listen(3333);