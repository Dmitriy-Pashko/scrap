import jobsModel from '../../models/jobs/jobs-model';

const jobs = {
  fetchJobs() {
    return jobsModel.fetch();
  },
  deleteJob(id, e) {
    return jobsModel.delete(id, e);
  },
};
export default jobs;
