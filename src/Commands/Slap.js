import { getSlapCount, setSlapCount } from "../Services/FirestoreService"

const Slap = async (client, channel, userstate, args) => {
  let slapCount = await getSlapCount();
  if (slapCount == null){
    slapCount = 0;
  }
  await setSlapCount(++slapCount);
    client.say(channel, `${userstate["display-name"]} slaps ${args.join(" ")}. ${slapCount} slaps have been given out.`);
}

export default Slap