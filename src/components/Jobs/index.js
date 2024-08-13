import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    selectedEmploymentTypes: [],
    salary: '',
    searchInput: '',
    totalJobs: 0,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {selectedEmploymentTypes, salary, searchInput} = this.state
    const employmentType = selectedEmploymentTypes.join()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salary}&search=${searchInput}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {jobs, total} = fetchedData

      const updatedJobs = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        totalJobs: total,
        jobsList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleCheckboxChange = (employmentTypeId, checked) => {
    if (checked) {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: [
            ...prevState.selectedEmploymentTypes,
            employmentTypeId,
          ],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: prevState.selectedEmploymentTypes.filter(
            id => id !== employmentTypeId,
          ),
        }),
        this.getJobsList,
      )
    }
  }

  handleRadioboxChange = salaryId => {
    this.setState({salary: salaryId}, this.getJobsList)
  }

  enterSearchInput = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  renderSuccessJobView = () => {
    const {jobsList, totalJobs} = this.state
    if (totalJobs > 0) {
      return (
        <ul className="list-cont">
          {jobsList.map(eachJob => (
            <JobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="failure-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs- Try other fitters</p>
      </div>
    )
  }

  renderProgressView = () => (
    <div className="failure-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderJobsDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {jobsList, searchInput} = this.state
    const {salaryRangesList, employmentTypesList} = this.props
    console.log(jobsList)
    return (
      <div className="Job-container">
        <Header />
        <div className="jobs-main-cont">
          <div>
            <Profile />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymentType={this.handleCheckboxChange}
              onChangeSalaryType={this.handleRadioboxChange}
            />
          </div>
          <div className="jobs-list-cont">
            <div className="search-input-container">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.enterSearchInput}
                className="search-btn"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
