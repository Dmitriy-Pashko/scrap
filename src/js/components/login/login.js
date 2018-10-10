import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';
import store from '../../models/login/login-store';
import loginController from './controller';
import '../../../css/login.css';

const Login = observer(() => {
  const { user } = store;
  return (
    <div className="form-canvas">
      <form className="login-form">
        <h1>Login form</h1>
        <TextField
          className="login-textfield"
          name="username"
          label="Username"
          onChange={e => loginController.handleChange(e)}
        />
        <br />
        <TextField
          className="login-textfield"
          name="password"
          type="password"
          label="Password"
          onChange={e => loginController.handleChange(e)}
        />
        <br />
        <Button className="login-button" onClick={e => loginController.loginUser(e, user)}>Submit</Button>
      </form>
    </div>
  );
});


export default Login;
