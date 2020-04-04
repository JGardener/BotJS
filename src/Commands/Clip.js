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
     console.log("I'm inside refreshToken and I'm the accessToken" + accessToken)
      return accessToken    
} 
  )

}

const createClip = (client, channel, userstate, accessToken, API_CLIENT_ID) => {
// console.log("Here's your access token! " + accessToken)
return fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=36866421`, {
  method: "POST",
  headers: {
    'Client-ID': API_CLIENT_ID,
    'Authorization': accessToken
        
  }})
    .then((response) => {
      return response.json()
    })
      .then((list) => {
        let editURL = list.data[0]["edit_url"];
        let user = userstate["display-name"];
        client.say(channel,`${user} Thanks for clipping! You'll find your clip in the Discord #clips-highlights channel.`)
    
          return {
          user: userstate["display-name"],
          editURL: list.data[0]["edit_url"]
        }})
  
}

const sendToDiscord = (user,editURL) => {
console.log("This is inside the sendToDiscord" + editURL)
return fetch("https://discordapp.com/api/webhooks/695516341527904318/q1dYd8isAcXKf6JTmt_xu0TtyLtz3NvvoJFh96P-b98QB2OAqCIin-1myEYj-BBt5_5a", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
    },

  body: JSON.stringify({
    username: "RomBot",
    content: `${user} has clipped! ${editURL}`
  })
  })
}


const Clip = (client, channel, userstate, API_CLIENT_ID, CLIENT_SECRET, REFRESH_CODE) => {
  refreshToken(API_CLIENT_ID, CLIENT_SECRET, REFRESH_CODE)
    .then((accessToken) => {
      createClip(client, channel, userstate, accessToken, API_CLIENT_ID)
        .then((object) => {
          console.log(object.user, object.editURL)
          sendToDiscord(object.user, object.editURL)})})
        
 
}

export default Clip;