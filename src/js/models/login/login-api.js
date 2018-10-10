import axios from 'axios';

const api = {

  loginUser(user) {
    return axios.post('http://localhost:3001/api/authentication/login', user);
  },

};

export default api;
