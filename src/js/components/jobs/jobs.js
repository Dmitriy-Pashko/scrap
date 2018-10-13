import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import store from '../../models/jobs/jobs-store';
import jobsController from './controller';
import '../../../css/jobs.css';

const Jobs = observer(class Jobs extends Component {
  constructor() {
    super();

    this.fetchJobs = jobsController.fetchJobs.bind(this);
    this.deleteJob = jobsController.deleteJob.bind(this);
    this.openModal = jobsController.openModal.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
  }

  render() {
    const { jobsList } = store;
    console.log(jobsList);
    return (
      <div>
        <ul className="jobs-list">
          {
            jobsList.map(job => (
              <li key={job._id} className="card-list">
                <Card>
                  <CardContent className="content">
                    <Typography gutterBottom variant="headline" component="h2">
                      {job.title}
                    </Typography>
                    <Typography component="p">
                      {job.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={this.openModal}>
                      Upadte
                    </Button>
                    <Button size="small" color="primary" onClick={(e) => { this.deleteJob(job._id, e); }}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </li>))
          }
        </ul>
      </div>
    );
  }
});

export default Jobs;
