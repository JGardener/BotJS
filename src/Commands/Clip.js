import fetch from "node-fetch"


const refreshToken = (API_CLIENT_ID, CLIENT_SECRET, REFRESH_CODE) => {
// Refresh Access Token
let accessToken = ""
return fetch(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${REFRESH_CODE}&client_id=${API_CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
  method: "POST"
})
  .then((response) => {  
    return response.json()})
      .then((data) => {
     
      accessToken = `Bearer ${data["access_token"]}`;   
      return accessToken    
} 
  )

}

const createClip = (client, channel, userstate, accessToken, API_CLIENT_ID) => {
// console.log("Here's your access token! " + accessToken)
fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=36866421`, {
      method: "POST",
      headers: {
        'Client-ID': API_CLIENT_ID,
        'Authorization': accessToken
        
        }}).then((response) => {
          return response.json()
        }).then((list) => {
          console.log(list)
          client.say(channel,`${userstate["display-name"]} Thanks for clipping! Edit your clip here! ${list.data[0]["edit_url"]} `)
        }
      )
}

const Clip = (client, channel, userstate, API_CLIENT_ID, CLIENT_SECRET, REFRESH_CODE) => {
  refreshToken(API_CLIENT_ID, CLIENT_SECRET, REFRESH_CODE)
    .then((accessToken) => {
    createClip(client, channel, userstate, accessToken, API_CLIENT_ID)})
 
}

export default Clip;