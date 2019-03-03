require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3100);

io.on('connection', (socket) => {
    const roomName = socket.handshake.query.room;
    const username = socket.handshake.query.username;

    socket.join(roomName);

    io.emit('somone joined', { username }).to(roomName);

    socket.on('disconnect', () => {
        io.emit('someone left', [{ username }]).to(roomName);
    });

    socket.on('message', () => {
        io.emit('message', [{ username, message: 'todo' }]);
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