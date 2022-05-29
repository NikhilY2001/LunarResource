import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

const PrivateRoute = (props) => {
  const auth = useContext(authContext)
  const {authed} = auth
  const localAuth = JSON.parse(localStorage.getItem("authed"))

  useEffect(() => {
    if(localAuth === true && !authed) {
      auth.login()
    }
  }, [authed, auth, localAuth])

  return authed || localAuth === true? (props.children  ): <Navigate to="/login" />
}

export default PrivateRoute;