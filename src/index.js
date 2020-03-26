import tmi from 'tmi.js';
import dotenv from 'dotenv';

dotenv.config();

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
    client.say(channel, "Fill in followage data here, Rom!")
}
console.log((message))
});

client.on('connected', () => {
    console.log('Connected');
});

client.connect();