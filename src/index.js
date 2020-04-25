
import tmi from 'tmi.js';
import dotenv from 'dotenv';
dotenv.config();
import fetch from "node-fetch";
import moment from "moment";
import commands from "./Commands/Commands"

/*
BOT INFO
const DISCORD_BOT_TOKEN = process.env.DISC_BOT_TOKEN
const DISCORD_WEBHOOK = process.env.DISC_WEBHOOK
const REFRESH_CODE = process.env.REFRESH_TOKEN
const AUTH_CODE = process.env.AUTHORIZATION_CODE
const CLIENT_SECRET = process.env.TOKEN
const API_CLIENT_ID = process.env.CLIENT_ID
*/

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

// Chat Paramters passed to each command.
const chatParams = {
    client: client,
    channel: channel,
    userstate: userstate,
    message, message,
    self: self,
    args: args
}

// If the command word from the chat message is present in the commands object, execute it with
// chatParams as an argument. ChatParams contains all the parameters we need.
if(commands[command]) {
    commands[command](chatParams);
}

console.log((message))
});



client.on('connected', () => {
    console.log('Connected');
});

client.connect();