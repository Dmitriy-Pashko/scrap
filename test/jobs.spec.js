const supertest = require('supertest');
const { expect } = require('chai');

const server = supertest.agent('http://localhost:3001');

const userCredentials = {
  username: 'Karry',
  password: '2221',
};

const fakeJob = {
  link: 'google.com',
  title: 'Cool job',
};

const updatedFake = {
  link: 'yandex.ru',
  title: 'less cool job',
};

describe('SAMPLE unit test', () => {
  let token = null;
  let id = null;

  before((done) => {
    server
      .post('/api/authentication/login')
      .send(userCredentials)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  // #1 should return home page
  it('should return 10 jobs', (done) => {
    // calling home page api
    server
      .get('/api/jobs/1')
      .expect('Content-type', /json/)
      .expect(200) // THis is HTTP response
      .end((err, res) => {
        expect(res.body.length).to.equal(10);
        done();
      });
  });

  it('should create fake job to make tests on it', (done) => {
    server
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeJob)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.job.link).to.equal(fakeJob.link);
        expect(res.body.job.title).to.equal(fakeJob.title);
        id = res.body.job._id;
        done();
      });
  });

  it('should update fake job properly', (done) => {
    server
      .put(`/api/jobs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedFake)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.job.link).to.equal(updatedFake.link);
        expect(res.body.job.title).to.equal(updatedFake.title);
        done();
      });
  });

  it('should delete fake job', (done) => {
    server
      .delete(`/api/jobs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.message).to.equal('job removed succesfully');
        done();
      });
  });
});
