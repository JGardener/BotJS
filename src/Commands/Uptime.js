import moment from "moment"
import fetch from "node-fetch"

const Uptime = (client, channel, API_CLIENT_ID, parseISOString) => {
    fetch("https://api.twitch.tv/helix/streams?user_id=36866421", {
        headers: {
        'Client-ID': API_CLIENT_ID,
        
        }}).then((response) => {
                return response.json()
        }).then((list) => {
        client.say(channel, `Rom started the stream ${moment(list.data[0]["started_at"]).fromNow()} at ${parseISOString(list.data[0]["started_at"])}`)
        
        }
    )
}

export default Uptime