require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user', require('./app/users/routes'));

// app.use("/", express.static(__dirname + "/../dist/game-lobby"));

// app.get('/', (req, res) => {
//     res.sendFile("index.html", { root: __dirname + "/../dist/game-lobby" });
// });

app.listen(port, () => console.log(`Now listening on port ${port}\n Go to localhost:${port} on your browser to view the app.`));