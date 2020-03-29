const Hug = (client, channel, userstate, args) => {  
    client.say(channel, `${userstate["display-name"]} gives a big hug to ${args.join(" ")}.`);    
}

export default Hug