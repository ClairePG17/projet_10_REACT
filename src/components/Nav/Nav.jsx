import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";

export default function Nav() {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <Link
            to="/"
            className="main-nav-item"
            onClick={e => {
              e.preventDefault(); 
              handleLogout();
            }}
          >
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        ) : (
          <Link className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

