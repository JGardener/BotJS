import { getSlapCount, setSlapCount } from "../Services/FirestoreService"

const Slap = async (chatParams) => {
  let slapCount = await getSlapCount();
  if (slapCount == null){
    slapCount = 0;
  }
  await setSlapCount(++slapCount);
    chatParams.client.say(chatParams.channel, `${chatParams.userstate["display-name"]} slaps ${chatParams.args.join(" ")}. ${slapCount} slaps have been given out.`);
}

export default Slap