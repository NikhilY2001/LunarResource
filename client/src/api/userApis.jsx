const baseURL = "http://localhost:3006/api";

const loginURL = "/login";
const registerURL = "/register";
const getUsersURL = "/users";
const getUserURL = "/users/get"
const deleteUserURL = "/users/delete";
const updateUserURL = "/users/update";

export const login = ({email, password}) => {
  if(email && password)
    return fetch(baseURL + loginURL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({email, password})
    })
      .then(async (resp) => {
        try {
          const data = await resp.json()
          return Promise.resolve(data)
        }
        catch {
          return Promise.reject({success: false, error: "Unable to login"})
        }
      })
      .catch( err => Promise.reject(err))
  return Promise.reject({success: false, errorMessage: "Invalid data"})
}

export const register = ({email, password, username}) => {
  if(email && password && username)
    return fetch(baseURL + registerURL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({email, password, username})
    })
      .then(async (resp) => {
        try {
          const data = await resp.json()
          return Promise.resolve(data)
        } catch {
          return Promise.reject({success: false, error: "Unknown error occurred"})
        }
      })
      .catch( err => Promise.reject(err))
  return Promise.reject({success: false, errorMessage: "Invalid data"})
}

export const getUsers = () => {
  return fetch(baseURL + getUsersURL, {
    method: 'GET',
    mode: 'cors',
  })
    .then(async (resp) => {
      try {
        const data = await resp.json()
        return Promise.resolve(data)
      } catch {
        return Promise.reject({success: false, error: "Unknown error occurred"})
      }
    })
    .catch( err => Promise.reject(err))
}

export const deleteUser = (id) => {
  return fetch(baseURL + deleteUserURL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({id})
  })
  .then(async (resp) => {
    try {
      const data = await resp.json()
      return Promise.resolve(data)
    }
    catch {
      return Promise.reject({success: false, error: "Unknown error occurred"})
    }
  })
  .catch( err => Promise.reject(err))
}

export const getUser = (id) => {
  return fetch(baseURL + getUserURL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({id})
  })
  .then(async (resp) => {
    try {
      const data = await resp.json()
      return Promise.resolve(data)
    }
    catch {
      return Promise.reject({success: false, error: "Unknown error occurred"})
    }
  })
  .catch( err => Promise.reject(err))
}

export const updateUser = (data) => {
  return fetch(baseURL + updateUserURL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  .then(async (resp) => {
    try {
      const data = await resp.json()
      return Promise.resolve(data)
    }
    catch {
      return Promise.reject({success: false, error: "Unknown error occurred"})
    }
  })
  .catch( err => Promise.reject(err)) 
}