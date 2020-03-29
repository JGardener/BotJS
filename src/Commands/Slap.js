let slapCounter = 0;

const Slap = (client, channel, userstate, args) => {
  ++slapCounter;
    client.say(channel, `${userstate["display-name"]} slaps ${args.join(" ")}. ${slapCounter} slaps have been given out.`);
}

export default Slap