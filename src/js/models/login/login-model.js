import { action } from 'mobx';
import store from './login-store';
import api from './login-api';


const login = {
  setUser: action(function (e) {
    store.user[e.target.name] = e.target.value;
  }),
  change: action(function (e) {
    this.setUser(e);
  }),
  login: action(function () {
    return api.loginUser(store.user)
      .then(action((res) => {
        console.log(res.data);
        sessionStorage.setItem('token', res.data.token);
        return res.data;
      }));
  }),
};

export default login;
