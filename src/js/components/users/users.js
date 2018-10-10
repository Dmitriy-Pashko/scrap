import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import store from '../../models/users/users-store';
import usersController from './controller';

const Users = observer(class Users extends Component {
  constructor() {
    super();

    this.fetchUsers = usersController.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { usersList } = store;
    console.log(usersList);
    return (
      <div>
        <ul className="jobs-list">
          {
            usersList.map(user => (
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
});

export default Users;
