import api from "./api"

const a = "api/user"

const register = (dto) => api.post(`${a}/register`,dto);
const login = (dto) => api.post(`${a}/login`,dto)
const getProfile = (id) => api.get(`${a}/${id}`);
const getInfo = (id) => api.get(`${a}/info`, {params: {id}});
const getAllXp = () => api.get(`${a}/get/all/xp`)
const buy = (id, price) => api.post(`${a}/buy`, null, {
  params: { id, price }
});
const postEvents = (id,events) => api.post(`${a}/events`, null, {
  params: {id,events}
})
const postPurchases = (id,purchases) => api.post(`${a}/purchases`, null, {
  params: {id,purchases}
})
const postOutsideActivities = (id,outsideActivities) => api.post(`${a}/outsideActivities`, null, {
  params: {id,outsideActivities}
})

const userService = {
    register,
    login,
    getProfile,
    getInfo,
    getAllXp,
    buy,
    postEvents,
    postPurchases,
    postOutsideActivities
  };

  export default userService;
