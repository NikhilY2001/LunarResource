const baseURL = "http://localhost:3006/api"

const elementsURL = '/elements'
const oresURL = '/ores'
const infoFilterURL = '/infofilters'

export const getElements = () => {
  return fetch(baseURL + elementsURL, {
		method: 'GET',
		mode: 'cors',
		})
			.then(async (resp) => {
        try {
          const data = await resp.json()
          return Promise.resolve(data)
        }
        catch {
          return Promise.reject({success: false, error: "Unable to get elements"})
        }
			})
			.catch( err => Promise.reject(err))
}

export const getOres = () => {
  return fetch(baseURL + oresURL, {
    method: 'GET',
    mode: 'cors',
  })
    .then(async (resp) => {
      try {
        const data = await resp.json()
        console.log(data)
        return Promise.resolve(data)
      }
      catch {
        return Promise.reject({success: false, error: "Unable to get ores"})
      }
    })
    .catch()
}

export const getInfoFilters = () => {
  return fetch(baseURL + infoFilterURL, {
    method: 'GET',
    mode: 'cors'
  })
    .then(async (resp) => {
      try {
        const data = await resp.json()
        return Promise.resolve(data)
      }
      catch {
        return Promise.reject({success: false, error: "Unable to get ore ore data"})
      }
    })
}