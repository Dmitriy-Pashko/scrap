import jobsModel from '../../models/jobs/jobs-model';

const jobs = {
  fetchJobs() {
    return jobsModel.fetch();
  },
};
export default jobs;
