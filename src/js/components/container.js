import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Jobs from './jobs/jobs';
import Users from './users/users';
import '../../css/main.css';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seoTitle: 'Hello world',
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="test">
          <ul className="sidebar">
            <li className="sidebar-li"><Link to="/jobs">Jobs</Link></li>
            <li className="sidebar-li"><Link to="/users">Users</Link></li>
          </ul>
          <div className="main-window">
            <Route path="/jobs" component={Jobs} />
            <Route path="/users" component={Users} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default FormContainer;

const wrapper = document.getElementById('scraper-here');
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
