import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import { getUser } from "../api/userApis";
import { useNavigate } from "react-router-dom";

const PrivilegedRoute = (props) => {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  const {admin, logout, login} = auth

  useEffect(() => {
    if(!admin) {
      try {
        const localUser = JSON.parse(localStorage.getItem('user'))
        getUser(localUser.id)
          .then((user) => {
            login(user)
            if(user.role === "Customer")
              navigate("/home")
          })
          .catch( err => {
            console.log(err)
            navigate("/home")
          })
      }
      catch(err) {
        logout()
      }
    }
  }, [admin])

  return admin ? (props.children  ): null
}

export default PrivilegedRoute;