const express = require('express');
const Room = require('./schema');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const path = require('path');

const saltRounds = 10;

const router = express.Router();

const authorizeUser = (req, res, next) => {
    const auth = req.get('Authorization');

    if(!auth) {
        return res.status(401).send({ errors: { auth: "No credentials sent." }});
    }

    const token = auth.split(' ')[1];
    
    const cert = fs.readFileSync(path.resolve(__dirname) + '/../../private.key');

    try {
        const decoded = jwt.verify(token, cert);
        res.locals.user_id = decoded.id;
        
        next();
    } catch(err) {
        console.trace(err);
        return res.status(403).send({ errors: { auth: "Invalid credential." }});
    }
}

const validRoomName = (req, res, next) => {
    const { name } = req.body.room;

    Room.findOne({
        name: {
            $eq: name
        }
    }, (err, room) => {
        if(err) {
            console.trace(err);
            throw err;
        }
        
        if(room) {
            res.status(400).send({ errors: { name: "Room name already in use." } });
            return;
        }

        next();
    });
}

router.post('/', validRoomName, authorizeUser, (req, res) => {
    console.log(req.body)
    console.log(req.body.room)
    console.log(res.locals)
    if(req.body.room) {
        const room = new Room({...req.body.room,
            });

        const user_id = res.locals.user_id;

        room.user = user_id;

        // consume user id
        res.locals.user_id = undefined;

        console.log("hi")

        room.save(err => {
            if(err) {
                console.trace(err);
                throw err;
            }

            console.log("wtf")
    
            res.status(200).send({ success: "Successfully added room.", room });
        });
    } else {
        console.log(req.body);
        res.status(400).send({ errors: { room: "Expected a room." }});
    }

});
 
router.get('/', (req, res) => {
    Room.find({}, (err, rooms) => {
        if(err) {
            console.trace(err);
            throw err;
        }

        res.status(200).send({ rooms });
    });
});


router.post('/valid-name', validRoomName, (req, res) => {
    res.status(200).send({ success: "Availible room name." });
});

router.delete('/delete/:id', authorizeUser, (req, res) => {
    const roomId = req.params.id;
    Room.findOneAndDelete({ _id: roomId }, (err, response) => {
        if(err) {
            console.trace(err);
            throw err;
        }

        res.status(200).send({ success: "Successfully deleted room." });
    });
});

module.exports = router;