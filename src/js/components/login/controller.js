import loginModel from '../../models/login/login-model';

const login = {
  loginUser(e, user) {
    return loginModel.login(e, user);
  },
  handleChange(e) {
    return loginModel.change(e);
  },
};
export default login;
