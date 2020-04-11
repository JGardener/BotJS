import { getHugCount, setHugCount } from "../Services/FirestoreService"

const Hug = async (client, channel, userstate, args) => {  
   let hugsCount = await getHugCount();
    console.log(hugsCount)
    if(hugsCount == null){
        hugsCount = 0;
    }
    await setHugCount(++hugsCount);
    client.say(channel, `${userstate["display-name"]} gives a big hug to ${args.join(" ")}. ${hugsCount} hugs have been given out.`);    
}

export default Hug