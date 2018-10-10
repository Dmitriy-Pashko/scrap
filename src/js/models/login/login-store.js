import { observable } from 'mobx';

const store = observable({
  user: {
    username: '',
    password: '',
  },
});

export default store;
