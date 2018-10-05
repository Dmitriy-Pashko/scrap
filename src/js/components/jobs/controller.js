import jobsModel from '../../models/jobsModel';

const jobs = {
  fetchJobs() {
    return jobsModel.fetch();
  },
};
export default jobs;
