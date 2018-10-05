import { observable } from 'mobx';

const store = observable({
  jobsList: [],
  // setWorker: action(function (newWorker) {
  //   this.worker = newWorker;
  // }),
});

export default store;
