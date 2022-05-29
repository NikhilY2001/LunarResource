import { createContext, useEffect, useState } from "react";

export const authContext = createContext()

export const useAuth = () => {
  const [authed, setAuthed] = useState(false)
  const [admin, setAdmin] = useState(false)

  return {
    authed,
    admin,
    login(user) {
      return new Promise(async res => {
        if (user && user.role === "Admin") {
          await setAdmin(true)
        }
        await setAuthed(true)
        await localStorage.setItem("authed", JSON.stringify(true))
        await localStorage.setItem("user", JSON.stringify(user))
        res()
      })
    },
    logout() {
      return new Promise(res => {
        setAuthed(false)
        setAdmin(false)
        localStorage.removeItem("authed")
        localStorage.removeItem('user')
        res()
      })
    }
  }
}

export const AuthProvider = (props) => {
  const auth = useAuth()
  return (
    <authContext.Provider value={auth}>
      {props.children}
    </authContext.Provider>
  )
}