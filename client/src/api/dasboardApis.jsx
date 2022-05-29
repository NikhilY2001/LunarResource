const baseURL = "http://localhost:3006/api";
const dashboardURL = "/dashboard"

export const getDashboard = () => {
  return fetch(baseURL + dashboardURL, {
    method: 'GET',
    mode: 'cors'
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