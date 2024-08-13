import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-cont">
        <Header />
        <div className="home-bg-cont">
          <div className="desc-cont">
            <h1 className="main-heading">Find The Job That Fits Your Life</h1>
            <p className="content">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-jobs-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
