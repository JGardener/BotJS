import Discord from "./Discord"
import Lurk from "./Lurk"
import Hug from "./Hug"
import Quote6 from "./Quote6"
import Uptime from './Uptime';
import Followage from "./Followage"
import Highlight from "./Highlight"
import Clip from './Clip';
import Slap from "./Slap"

let commands = {
    "!clip": Clip,
    "!discord": Discord,
    "!followage": Followage,
    "!highlight": Highlight,
    "!hug": Hug,
    "!lurk": Lurk,
    "!quote6": Quote6,
    "!slap": Slap,
    "!uptime": Uptime, 
}

export default commands