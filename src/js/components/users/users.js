import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    return axios.get('http://localhost:3001/api/users/all')
      .then((res) => {
        this.setState({ users: res.data });
        return res.data;
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <ul className="jobs-list">
          {
            users.map(user => (
              <li key={user._id} className="card-list">
                <Card>
                  <CardContent className="content">
                    <Typography gutterBottom variant="headline" component="h2">
                      {user.username}
                    </Typography>
                    <Typography component="p">
                      {user.email}
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

export default Users;
