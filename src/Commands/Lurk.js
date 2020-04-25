const Lurk = (chatParams) => {
    chatParams.client.say(chatParams.channel, `${chatParams.userstate["display-name"]} is now lurking, see you soon!`)
}

export default Lurk