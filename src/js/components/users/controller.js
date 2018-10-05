import usersModel from '../../models/users/users-model';

const users = {
  fetchUsers() {
    return usersModel.fetch();
  },
};
export default users;
