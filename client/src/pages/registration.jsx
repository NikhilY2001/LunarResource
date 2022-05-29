import { useState } from 'react';
import Input from '../component/input.jsx';
import SigningCard from '../component/signingCard.jsx';
import { register as registerUser } from '../api/userApis';
import { useNavigate } from 'react-router-dom';
import { Html } from '@react-three/drei';

const Register = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState({
    message: "",
    inputName: ""
  })

  const handleChange = (e) => {
    switch(e.target.name) {
      case "username":
        setUsername(e.target.value)
        break;
      case "email":
        setEmail(e.target.value)
        break;
      case "password":
        setPassword(e.target.value)
        break;
      default: break;
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if(username && email && password) {
      registerUser({username, email, password})
        .then( (data) => {
          if(data.success) {
            window.alert("Registration Complete, Welcome onboard")
            navigate("/login")
          }
        })
        .catch( (err) => {
          console.log(err)
        })
    }
    else {
      if(!username) 
        setError({message: "Username must not be empty", inputName: "username"})
      else if(!email)
        setError({message: "Email must not be empty", inputName: "email"})
      else if(!password) 
        setError({message: "Enter a valid password", inputName: "password"})
    }
  }

  return (
    <Html style={{width: "400px", height: "auto", transform: "translate(calc(-50vw + 50px), -50%)"}}>
      <SigningCard>
        <h2 className="register-card-header text-center mb-5">
          Register
        </h2>
        <form onSubmit={handleRegister} className="row">
          <Input 
            className="col-12"
            label="Username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
            type="text"
            required={true}
            name="username"
            error={error}
          />
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

export default Register;