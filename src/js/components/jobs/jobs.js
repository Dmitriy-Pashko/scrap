import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import store from '../../models/jobs/jobs-store';
import jobsController from './controller';
import '../../../css/jobs.css';

class Jobs extends Component {
  constructor() {
    super();

    this.fetchJobs = jobsController.fetchJobs.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
  }

  // fetchJobs() {
  //   return axios.get('http://localhost:3001/api/jobs/1')
  //     .then((res) => {
  //       this.setState({ jobs: res.data });
  //       return res.data;
  //     });
  // }

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
                    <Button size="small" color="primary">
                      Upadte
                    </Button>
                    <Button size="small" color="primary">
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
}

export default Jobs;
