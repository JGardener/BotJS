import { getHugCount, setHugCount } from "../Services/FirestoreService"

const Hug = async (chatParams) => {  
   let hugsCount = await getHugCount();
    console.log(hugsCount)
    if(hugsCount == null){
        hugsCount = 0;
    }
    await setHugCount(++hugsCount);
    chatParams.client.say(chatParams.channel, `${chatParams.userstate["display-name"]} gives a big hug to ${chatParams.args.join(" ")}. ${hugsCount} hugs have been given out.`);    
}

export default Hug