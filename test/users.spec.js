const supertest = require('supertest');
const { expect } = require('chai');
// const sinon = require('sinon');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:3001');

const userCredentials = {
  username: 'Karry',
  password: '2221',
};

const fakeUser = {
  username: 'Fantom',
  email: 'fantom@gmail.com',
  password: '3333',
};

const updatedUser = {
  username: 'Fantom2',
  email: 'fantom2@gmail.com',
  password: '33332',
};

// UNIT test begin

describe('SAMPLE unit test', () => {
  let token = null;
  let userId = null;

  before((done) => {
    server
      .post('/api/authentication/login')
      .send(userCredentials)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should create fake user to make test on it', (done) => {
    server
      .post('/api/authentication/register')
      .send(fakeUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.newUser.username).to.equal(fakeUser.username);
        expect(res.body.newUser.email).to.equal(fakeUser.email);
        userId = res.body.newUser._id;
        done();
      });
  });

  it('should update fake user properly', (done) => {
    server
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.user.username).to.equal(updatedUser.username);
        expect(res.body.user.email).to.equal(updatedUser.email);
        done();
      });
  });

  it('should delete fake user', (done) => {
    server
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('user removed succesfully');
        done();
      });
  });
});
