import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons'


export default function Nav() {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div className="main-nav-icons">
        {token && profile && profile.userName && (
          <>
            <span className="main-nav-username">{profile.userName}</span>
            <FontAwesomeIcon icon={faUserCircle} className="main-nav-icon" />
            <FontAwesomeIcon icon={faCog} className="main-nav-icon" />
            <FontAwesomeIcon 
              icon={faPowerOff}
              className="main-nav-icon"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
          </>
        )}
        {!token && (
          <Link className="main-nav-item" to="/SignIn">
            <FontAwesomeIcon icon={faUserCircle} className="main-nav-icon" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
