import api from "./api"

const a = "api/twitter"

export const connect = async (userId) => {
    try {
      const response = await api.get(`${a}/auth`, {params : {userId} });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Erro ao conectar Twitter:', error);
      throw error;
    }
  };

const twitterService = {
    connect
} 

export default twitterService;