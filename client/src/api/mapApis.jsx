const baseURL = "http://localhost:3006/api"
const getmapURL = "/ores/getmap"

export const getMaps = (data) => {
  return fetch(baseURL + getmapURL, {
    method: "POST",
    mode: 'cors',
    body: JSON.stringify(data)
  })
  .then(async (resp) => {
    try {
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      return Promise.resolve(url)
    }
    catch {
      return Promise.reject({success: false, error: "Error while getting map data"})
    }
  })
  .catch( err => Promise.reject(err))
}