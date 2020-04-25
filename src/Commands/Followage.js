import fetch from "node-fetch"
import moment from "moment"
import parseISOString from "../Utilities/parseISOString"



const Followage = (chatParams) =>{
    const getUserFollowAge = (userId) => {
    
    fetch(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/36866421`, { 
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': process.env.CLIENT_ID,
        }}).then((response) => {
                return response.json()
        }).then((data) => {
        let a = moment(data["created_at"]);
        let b = moment();
        chatParams.client.say(chatParams.channel, `${chatParams.userstate["display-name"]} has been following since ${parseISOString(data["created_at"])}, ${a.from(b)}`)
        });
    }
            getUserFollowAge(chatParams.userstate["user-id"]);
}

export default Followage;