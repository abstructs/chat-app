require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('./app/users/schema.js');
const Player = require('./app/players/schema.js');
const Game = require('./app/games/schema.js');

const saltRounds = 10;

const url = process.env.DB_URL;

mongoose.connect(url, { useNewUrlParser: true });

const getSalt = () => {
    return bcrypt.genSalt(saltRounds);
}

// Passwords are hashed, use this function to save new users.
const saveUser = async (user) => {
    const salt = await getSalt();
    const hash = await bcrypt.hash(user.password, salt);

    return new User({
        ...user,
        password: hash
    }).save();
}

const saveGame = (game) => {
    return new Game({
        ...game
    }).save();
}

const savePlayer = (player) => {
    return new Player({
        ...player
    }).save();
}

// Player Data To Populate With
const names = ["Zandra", "Tfue", "Faker", "Abstruct", "Shroud", "xXSniperXx", "tacoman123", "7733holly"];
const ranks = ["1", "2", "3", "4", "5"];
const scores = ["1000", "500", "100" , "2500", "5000", "7500", "10000"];
const times = ["1 minute", "5 minutes", "10 minutes", "30 minutes", "1 hour"];
const gamesPlayed = ["Diablo 3", "Black Desert Online", "League of Legends", "Counter Strike", "Starcraft 2", "Minecraft"];
const playerStatuses = ["Available", "Busy"];

// Game Data To Populate With
const titles = ["Diablo 3", "Black Desert Online", "League of Legends", "Counter Strike", "Starcraft 2", "Minecraft", "Fortnite"];
const platforms = ["Xbox One", "PS4", "Nintendo Switch", "PC"];
const genres = ["RPG", "FPS", "Strategy", "Indie", "Sandbox", "Horror"];
const publishers = ["Blizzard", "Treyarch", "Riot Games", "Valve", "Epic Games"];
const releases = ["2010", "2012", "2014", "2016", "2018"];
const gameStatuses = ["Active", "Inactive"];

// gets a random item from an array
const getRandom = (arr) => {
    return arr[Math.round(Math.random() * (arr.length - 1))];
}

const users = [
    {
        username: "admin",
        password: "admin",
    }
];

const players = names.map((name => {
    return {
        name,
        rank: getRandom(ranks),
        score: getRandom(scores),
        time: getRandom(times),
        gamePlayed: getRandom(gamesPlayed),
        status: getRandom(playerStatuses)
    };
}));

const games = titles.map((title => {
    return {
        title,
        platform: getRandom(platforms),
        publisher: getRandom(publishers),
        genre: getRandom(genres),
        release: getRandom(releases),
        status: getRandom(gameStatuses)
    };
}));

console.log("\n----------------------------------");
console.log("\nDropping old collections...");

// Clear current database

// mongo throws an error if the collection doesn't exist so we ignore only that err msg
User.collection.drop(err => {
    if(err && err.errmsg != "ns not found") {
        console.log(err)
    }
});

Player.collection.drop(err => {
    if(err && err.errmsg != "ns not found") {
        console.log(err)
    }
});

Game.collection.drop(err => {
    if(err && err.errmsg != "ns not found") {
        console.log(err)
    }
});

console.log("\nSaving new data...");

const userPromises = users.map(saveUser);

const playerPromises = players.map(savePlayer);

const gamePromises = games.map(saveGame);

Promise.all([...userPromises, ...playerPromises, ...gamePromises]).then(res => {
    console.log("\nDatabase has been successfully cleared and populated with new data.");
    console.log("Please use username: \"admin\" password: \"admin\" to login.\n");
    console.log("----------------------------------\n");
}).catch(err => {
    console.error("An error occured:");
    console.trace(err);
}).then(_ => {
    mongoose.connection.close();
    process.exit();
});