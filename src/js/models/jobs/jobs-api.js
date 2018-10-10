import axios from 'axios';

const api = {
  fetchJobs() {
    return axios.get('http://localhost:3001/api/jobs/1');
  },
  deleteJob(id) {
    return axios.delete(`http://localhost:3001/api/jobs/${id}`);
  },
  createJob(job) {
    return axios.post('http://localhost:3001/api/jobs', job);
  },
  updateJob(job, id) {
    return axios.put(`http://localhost:3001/job/${id}`, job);
  },
};

export default api;
