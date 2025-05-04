import api from "./api"

const a = "api/instagram"

const connect = () => api.get(`${a}/auth`);

const instagramService = {
    connect
}

export default instagramService; 