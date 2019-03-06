require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');
const path = require('path');   
const jwt = require('jsonwebtoken');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(3100);

const getChatUsername = (token) => {
    const cert = fs.readFileSync(path.resolve(__dirname) + '/private.key');

    try {
        const decoded = jwt.verify(token, cert);

        return decoded.username;        
    } catch(err) {
        return "Anonymous";
    }
}

io.on('connection', (socket) => {
    const roomName = socket.handshake.query.room;
    const token = socket.handshake.query.token;

    const username = getChatUsername(token);

    console.log(socket.handshake);

    socket.join(roomName);

    const joinMessage = `${username} has joined the room`;

    io.in(roomName).emit('join', { username, message: joinMessage, type: 'join' });

    socket.on('disconnect', () => {
        const message = `${username} has left the room`;

        io.in(roomName).emit('left', { username, message, type: 'disconnect' });
    });

    socket.on('message', (data) => {
        const message = data.message;

        io.to(roomName).emit('message', { username, message, type: 'message' });
    })
});

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user', require('./app/users/routes'));
app.use('/room', require('./app/rooms/routes'));

// app.use("/", express.static(__dirname + "/../dist/game-lobby"));

// app.get('/', (req, res) => {
//     res.sendFile("index.html", { root: __dirname + "/../dist/game-lobby" });
// });

app.listen(port, () => console.log(`Now listening on port ${port}\n Go to localhost:${port} on your browser to view the app.`));