import React, { useContext, useState, useEffect } from 'react';
import Input from '../component/input.jsx';
import SigningCard from '../component/signingCard.jsx';
import { login as loginUser } from '../api/userApis';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext.jsx';
import { Html } from '@react-three/drei';

const Login = (props) => {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    message: "",
    inputName: ""
  })

  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem("authed"))
    if(localAuth) {
      auth.login()
      navigate("/home")
    }
  }, [])

  const handleChange = (e) => {
    switch(e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password) {
      loginUser({email, password})
        .then(async (data) => {
          if(data.success) {
            auth.login(data)
              .then( () => navigate("/home"))
              .catch( err => console.log(err))
          }
        })
        .catch( (err) => {
          console.log(err)
        })
    }
    else {
      if(!email)
        setError({message: "Email must not be empty", inputName: "email"})
      else if(!password) 
        setError({message: "Enter a valid password", inputName: "password"})
    }
  }

  return (
    <Html style={{width: "400px", height: "auto", transform: "translate(calc(-50vw + 50px), -50%)"}}>
      <SigningCard>
        <h2 className="login-card-header text-center mb-5">
          Login
        </h2>
        <form onSubmit={handleLogin} className="row">
          <Input 
            className="col-12"
            label="Email" 
            value={email} 
            onChange={handleChange} 
            placeholder='Enter your email address'
            type="email"
            required={true}
            name="email"
            error={error}
          />
          <Input 
            className="col-12"
            label="Password" 
            value={password} 
            onChange={handleChange} 
            placeholder='Enter your Password'
            type="password"
            required={true}
            name="password"
            error={error}
          />
          <div className="col-12 mb-2 mt-5">
            <button className="btn bg-primary text-light w-100">Submit</button>
          </div>
        </form>
      </SigningCard>
    </Html>
  )
}

export default Login;