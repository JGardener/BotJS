import fetch from "node-fetch"

const Clip = (API_CLIENT_ID, CLIENT_SECRET, AUTH_CODE, RERESH_CODE) => {
// Refresh Access Token
let accessToken = "";
fetch(`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${RERESH_CODE}&client_id=${API_CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
  method: "POST"
})
  .then((response) => {
    return response.json()})
      .then((data) => {
      accessToken = data["access_token"]
      console.log(data);      
    } 
  )
// Make a promise here to make sure this runs asynchronously.....


fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=36866421`, {
      method: "POST",
      headers: {
        'Client-ID': API_CLIENT_ID,
        'Authorization': accessToken
        
        }}).then((response) => {
          return response.json()
        }).then((list) => {
          console.log(list)
        }
      )
}

export default Clip;