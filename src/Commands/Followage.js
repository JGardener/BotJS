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
        let followStart = moment(data["created_at"]);
        let rightNow = moment();
        Date.getFormattedDateDiff = function(date1, date2) {
        var b = moment(date1),
        a = moment(date2),
        intervals = ['years','months','weeks','days'],
        out = [];
 
        for(var i=0; i<intervals.length; i++){
            var diff = a.diff(b, intervals[i]);
            b.add(diff, intervals[i]);
            out.push(diff + ' ' + intervals[i]);
        }
        return out.join(', ');
      };
        chatParams.client.say(chatParams.channel, `${chatParams.userstate["display-name"]} has been following since ${parseISOString(data["created_at"])}, ${Date.getFormattedDateDiff(followStart, rightNow)}`)
        });
    }
            getUserFollowAge(chatParams.userstate["user-id"]);
}

export default Followage;