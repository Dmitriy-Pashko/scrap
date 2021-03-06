import { observable, action } from 'mobx';
import store from './jobs-store';
import api from './jobs-api';


const jlist = {
  jobsList: observable([]),
  setJobsList: action(function (list) {
    store.jobsList = list;
  }),
  fetch: action(function () {
    return api.fetchJobs()
      .then(action((res) => {
        this.setJobsList(res.data);
        return res.data;
      }));
  }),
  delete: action(function (id, e) {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    console.log(token);
    api.deleteJob(id, token);
  }),
  // create: action(function (worker) {
  //   return api.create(worker);
  // }),
  // update: action(function (worker, id) {
  //   return api.update(worker, id);
  // }),
};

export default jlist;
