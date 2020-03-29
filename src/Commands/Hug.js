let hugsCounter = 0;
const Hug = (client, channel, userstate, args) => {  
    ++hugsCounter;
    client.say(channel, `${userstate["display-name"]} gives a big hug to ${args.join(" ")}. ${hugsCounter} hugs have been given out.`);    
}

export default Hug