const Lurk = (client, channel, userstate) => {
    client.say(channel, `${userstate["display-name"]} is now lurking, see you soon!`)
}

export default Lurk