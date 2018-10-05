import axios from 'axios';

const api = {
  fetchJobs() {
    return axios.get('http://localhost:3001/api/jobs/1');
  },
  // delete(id) {
  //   return axios.delete(`http://localhost:3001/api/workers/${id}`);
  // },
  // create(worker) {
  //   return axios.post('http://localhost:3001/api/workers', worker);
  // },
  // update(worker, id) {
  //   return axios.put(`http://localhost:3001/api/workers/${id}`, worker);
  // },

};

export default api;
