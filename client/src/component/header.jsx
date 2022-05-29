import { useLocation, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../contexts/authContext';
import { Html } from '@react-three/drei';
import Logo from '../assets/logo.png';
import { AuthProvider } from '../contexts/authContext';

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useContext(authContext);
  const [primaryNavBtn, setPrimaryNavBtn] = useState("Register")
  const [redirectPath, setRedirectPath] = useState("/register")
  const [selectedDropdown, setSelectedDropdwon] = useState(null)

  useEffect(() => {
    if(auth.authed) {
      setPrimaryNavBtn("Logout")
      setRedirectPath("/login")
    } else {
      switch(location.pathname) {
        case '/register':
          setPrimaryNavBtn("Login")
          setRedirectPath("/login")
          break;
        case '/login':
          setPrimaryNavBtn("Register")
          setRedirectPath("/register")
          break;
        default:
          setPrimaryNavBtn("Login")
          setRedirectPath("/login")
      }
    }
    
  }, [auth.authed, location.pathname])

  const handleRedirection = (e) => {
    if(auth.authed)
      auth.logout()
    navigate(redirectPath)
  }

  const handleOpenDropdown = (dropdown) => {
    if(dropdown !== selectedDropdown) setSelectedDropdwon(dropdown)
    else setSelectedDropdwon(null)
  }

  const handleCloseDropdown = (e) => {
    setSelectedDropdwon(null)
  }

  const handleNavigate = (e) => {
    handleCloseDropdown()
    navigate(e.target.name)
  }

  return (
    <Html style={{width: "100vw", height: "70px", transform: "translate(-50vw, -50vh)"}}>
      <div className="header-container ps-5 pe-5 window">
        <div className="row">
          <div className="col-3 logo-container p-2">
            <img src={Logo} alt="logo" className="logo"/>
          </div>
          <div className="col-7">
            {
              auth.authed && (
                <div className="row justify-content-end">
                  <div className="col-2 position-relative">
                    <button className="w-100 authNavBtn p-1 mt-3" onClick={() => handleOpenDropdown("info")}>Info</button>
                    {
                      selectedDropdown === "info" && (
                        <div className="d-flex position-absolute dropdown flex-column w-100 text-center mt-4 window pt-2 pb-2">
                          <button className="dropdown-element w-100" name="/info/ore" onClick={handleNavigate} to="/info/ore">Ores</button>
                          <button className="dropdown-element w-100" name="/info/isotope" onClick={handleNavigate} to="/info/isotope">Isotopes</button>
                          <button className="dropdown-element w-100" name="/info/element" onClick={handleNavigate} to="/info/element">Elements</button>
                        </div>
                      )
                    }
                  </div>
                  <div className="col-2">
                    <button name="/about" className="w-100 authNavBtn p-1 mt-3" onClick={handleNavigate}>About</button>
                  </div>
                  <div className="col-2">
                    <button name="/home" className="w-100 authNavBtn p-1 mt-3" onClick={handleNavigate}>Home</button>
                  </div>
                  <div className="col-2">
                    <button name="/faqs" className="w-100 authNavBtn p-1 mt-3" onClick={handleNavigate}>FAQs</button>
                  </div>
                  {
                    auth.admin && (
                      <div className="col-2">
                        <button name="/admin/dashboard" className="w-100 authNavBtn p-1 mt-3" onClick={handleNavigate}>Dashboard</button>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
          <div className="col-2">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8 ps-2 pe-2">
                <button className="auth-btn text-light m-3 w-100 p-1" onClick={handleRedirection}>
                  {primaryNavBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  )
}

export default Header;