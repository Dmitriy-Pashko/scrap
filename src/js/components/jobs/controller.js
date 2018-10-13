import jobsModel from '../../models/jobs/jobs-model';
import formModel from '../../models/jobsForm/form-model';

const jobs = {
  openModal() {
    return formModel.open();
  },
  fetchJobs() {
    return jobsModel.fetch();
  },
  deleteJob(id, e) {
    return jobsModel.delete(id, e);
  },
};
export default jobs;
