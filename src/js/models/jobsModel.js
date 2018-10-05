import { action } from 'mobx';
import store from './store';
import api from './api';


const jlist = {
  jobslist: [],
  setJobsList: action(function (list) {
    store.jobsList = list;
  }),
  fetch: action(function () {
    return api.fetchJobs()
      .then((res) => {
        this.setJobsList(res.data);
        return res.data;
      });
  }),
  // delete: action(function (id) {
  //   api.delete(id);
  // }),
  // create: action(function (worker) {
  //   return api.create(worker);
  // }),
  // update: action(function (worker, id) {
  //   return api.update(worker, id);
  // }),
};

export default jlist;
