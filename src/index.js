import tmi from 'tmi.js';
import dotenv from 'dotenv';
import fetch from "node-fetch";
import moment from "moment";

dotenv.config();

// Convert time function
function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

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

// Command for simple testing.
// Dice
    if (command === "!dice") {
        client.say(channel, `${userstate["display-name"]} rolled: ` + Math.floor((Math.random() * 6) + 1));
    }

    
// Hug
    if (command === ("!hug")){   
    console.log(args);
    client.say(channel, `${userstate["display-name"]} gives a big hug to ${args.join(" ")}.`);    
}

// Discord
    if (command === "!discord"){
    client.say(channel, "Join the community Discord! https://discord.gg/8VyXumH")    
}

// Lurk
    if(command === "!lurk"){
    client.say(channel, `${userstate["display-name"]} is now lurking, see you soon!`)
}

// Highlight
    if (command === "!highlight"){
    client.say(channel, "Check out the latest stream highlight video; #19! https://www.youtube.com/watch?v=MneaiGrX7iU")
}

//Followage 
    if(command === "!followage"){
    const getUserFollowAge = (userId) => {
    
    fetch(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/36866421`, { 
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': API_CLIENT_ID,
        }}).then((response) => {
                return response.json()
        }).then((data) => {
        client.say(channel, `${userstate["display-name"]} has been following since ${parseISOString(data["created_at"])}`)
        });
    }
            getUserFollowAge(userstate["user-id"]);
}


// Uptime
    if(command === "!uptime"){
    fetch("https://api.twitch.tv/helix/streams?user_id=36866421", {
        headers: {
        'Client-ID': API_CLIENT_ID,
        
        }}).then((response) => {
                return response.json()
        }).then((list) => {
        client.say(channel, `Rom started the stream ${moment(list.data[0]["started_at"]).fromNow()} at ${parseISOString(list.data[0]["started_at"])}`)
        
        }
    )
}
console.log((message))
});



client.on('connected', () => {
    console.log('Connected');
});

client.connect();