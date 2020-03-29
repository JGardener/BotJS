// Dice
const Dice = (client, channel, userstate) => {
    client.say(channel, `${userstate["display-name"]} rolled: ` + Math.floor((Math.random() * 6) + 1));
    }


export default Dice;