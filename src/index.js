import tmi from 'tmi.js';
import dotenv from 'dotenv';
import fetch from "node-fetch";
import moment from "moment";
import Dice from "./Commands/Dice"
import Discord from './Commands/Discord';
import Lurk from "./Commands/Lurk"
import Hug from "./Commands/Hug"
import Quote6 from "./Commands/Quote6"
import Uptime from './Commands/Uptime';
import Followage from "./Commands/Followage"
import Highlight from "./Commands/Highlight"
import Clip from './Commands/Clip';
import Slap from "./Commands/Slap"

dotenv.config();

// Convert time function
function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const REFRESH_CODE = process.env.REFRESH_TOKEN
const AUTH_CODE = process.env.AUTHORIZATION_CODE
const CLIENT_SECRET = process.env.TOKEN
const API_CLIENT_ID = process.env.CLIENT_ID
const client = new tmi.Client({
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.BOT_OAUTH
    },
    channels: [
        'RomculusTV'
    ]
});

client.on('message', (channel, userstate, message, self) => {
    const args = message.split(" ");
    const command = args.shift();

    if (self) {
        return;
    }


// Dice
    if (command === "!dice") {
        Dice(client, channel, userstate);
    }

    
// Hug
    if (command === ("!hug")){   
    Hug(client, channel, userstate, args) 
}

// Discord
    if (command === "!discord"){
    Discord(client, channel);    
}

// Lurk
    if(command === "!lurk"){
    Lurk(client, channel, userstate)
}

// Highlight
    if (command === "!highlight"){
    Highlight(client, channel)
}

//Followage 
    if(command === "!followage"){
    Followage(client, channel, API_CLIENT_ID, userstate, parseISOString);
}


// Uptime
    if(command === "!uptime"){
    Uptime(client, channel, API_CLIENT_ID, parseISOString)
}

// Quote 6
    if(command === "!quote6"){
    Quote6(client, channel)
}

// Clip
    if(command === "!clip"){
    Clip(API_CLIENT_ID, CLIENT_SECRET, AUTH_CODE, REFRESH_CODE)
}

// Slap 
    if(command === "!slap"){
    Slap(client, channel, userstate, args)
}
console.log((message))
});



client.on('connected', () => {
    console.log('Connected');
});

client.connect();