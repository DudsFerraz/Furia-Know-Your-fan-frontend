import api from "./api"

const a = "api/twitch"

const connect = () => api.get(`${a}/auth`);

const twitchService = {
    connect
}

export default twitchService; 