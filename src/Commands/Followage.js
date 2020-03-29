import fetch from "node-fetch"

const Followage = (client, channel, API_CLIENT_ID, userstate, parseISOString) =>{
    const getUserFollowAge = (userId) => {
    
    fetch(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/36866421`, { 
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': API_CLIENT_ID,
        }}).then((response) => {
                return response.json()
        }).then((data) => {
        client.say(channel, `${userstate["display-name"]} has been following since ${parseISOString(data["created_at"])}`)
        });
    }
            getUserFollowAge(userstate["user-id"]);
}

export default Followage;