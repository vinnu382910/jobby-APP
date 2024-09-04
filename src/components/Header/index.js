import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {MdHome, MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-cont">
      <Link to="/" className="nav-link">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logo"
          />
        </li>
      </Link>
      <li className="nav-menu">
        <Link to="/" className="nav-link">
          <p className="nav-item">Home</p>
        </Link>
        <Link to="/jobs" className="nav-link">
          <p className="nav-item">Jobs</p>
        </Link>
      </li>
      <li>
        <Link to="/" className="nav-link">
          <MdHome className="nav-icon" />
        </Link>
        <Link to="/jobs" className="nav-link">
          <MdWork className="nav-icon" />
        </Link>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
        <FiLogOut className="nav-icon" onClick={onClickLogout} />
      </li>
    </ul>
  )
}

export default withRouter(Header)
