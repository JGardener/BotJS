import tmi from 'tmi.js';
import dotenv from 'dotenv';
import fetch from "node-fetch"

dotenv.config();


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
    if (self) {
        return;
    }

// Dice
    if (message === "!dice") {
        client.say(channel, `${userstate["display-name"]} rolled: ` + Math.floor((Math.random() * 6) + 1));
    }

    
// Hug
    if (message.includes("!hug")){
    let newMessage = message.replace("!hug", "");
        client.say(channel, `${userstate["display-name"]} gives a big hug to ${newMessage}.`);
     
}

// Discord
 if (message === "!discord"){
    client.say(channel, "Join the community Discord! https://discord.gg/8VyXumH")    
}

// Lurk
 if(message === "!lurk"){
    client.say(channel, `${userstate["display-name"]} is now lurking, see you soon!`)
}

// Highlight
    if (message === "!highlight"){
    client.say(channel, "Check out the latest stream highlight video; #19! https://www.youtube.com/watch?v=MneaiGrX7iU")
}

//Followage 
    if(message === "!followage"){
    const getUserFollowAge = (userId) => {
    
    fetch(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/36866421`, { 
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': API_CLIENT_ID,
        }}).then((response) => {
                return response.json()
        }).then((data) => {
        function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
        client.say(channel, `${userstate["display-name"]} has been following since ${parseISOString(data["created_at"])}`)
        });
    }
            getUserFollowAge(userstate["user-id"]);
}


console.log((message))
});



client.on('connected', () => {
    console.log('Connected');
});

client.connect();