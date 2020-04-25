import moment from "moment"
import fetch from "node-fetch"
import parseISOString from "../Utilities/parseISOString"


const Uptime = (chatParams) => {
// const API_CLIENT_ID = process.env.CLIENT_ID
    fetch("https://api.twitch.tv/helix/streams?user_id=36866421", {
        headers: {
        'Client-ID': process.env.CLIENT_ID,
        
        }}).then((response) => {
                return response.json()
        }).then((list) => {
        chatParams.client.say(chatParams.channel, `Rom started the stream ${moment(list.data[0]["started_at"]).fromNow()} at ${parseISOString(list.data[0]["started_at"])}`)
        
        }
    )
}

export default Uptime