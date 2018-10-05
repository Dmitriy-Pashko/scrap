import { observable, action } from 'mobx';
import store from './users-store';
import api from './users-api';


const ulist = {
  usersList: observable([]),
  setUsersList: action(function (list) {
    store.usersList = list;
  }),
  fetch: action(function () {
    return api.fetchUsers()
      .then((res) => {
        this.setUsersList(res.data);
        return res.data;
      });
  }),
};

export default ulist;
