import fetch from "node-fetch"
import moment from "moment"



const refreshToken = () => {
// const CLIENT_SECRET = process.env.TOKEN
// const REFRESH_CODE = process.env.REFRESH_TOKEN
// const API_CLIENT_ID = process.env.CLIENT_ID
// Refresh Access Token
let accessToken = ""
return fetch(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.TOKEN}`, {
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

const createClip = (chatParams, accessToken,) => {

return fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=36866421`, {
  method: "POST",
  headers: {
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': accessToken
        
  }})
    .then((response) => {
      return response.json()
    })
      .then((list) => {
        let editURL = `https://clips.twitch.tv/${list.data[0]["id"]}`;
        console.log(editURL)
        let user = chatParams.userstate["display-name"];
        chatParams.client.say(chatParams.channel,`${user} Thanks for clipping! You'll find your clip in the Discord #clips-highlights channel.`)
    
          return {
          user: chatParams.userstate["display-name"],
          editURL: `https://clips.twitch.tv/${list.data[0]["id"]}`
        }})
  
}

const sendToDiscord = (user, editURL) => {

// const DISCORD_WEBHOOK = process.env.DISC_WEBHOOK


return fetch(process.env.DISC_WEBHOOK, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
    },

  body: JSON.stringify({
    username: "RomBot",
  // April 25th 2020 - update the moment.format() to display time-only, not the full date, time and timezone.
    content: `${user} clipped the stream at ${moment()}! ${editURL}`
  })
  })
}


const Clip = (chatParams) => {
  refreshToken()
    .then((accessToken) => {
      createClip(chatParams, accessToken)
        .then((object) => {
          sendToDiscord(object.user, object.editURL)})})
        
 
}

export default Clip;