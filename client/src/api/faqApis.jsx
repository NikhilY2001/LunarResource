const baseURL = "http://localhost:3006/api"

const getURL = '/faqs'

export const getFAQs = () => {
  // return fetch(baseURL + getURL, {
	// 	method: 'GET',
	// 	mode: 'cors',
	// 	})
	// 		.then(async (resp) => {
  //       try {
  //         const data = await resp.json()
  //         return Promise.resolve(data)
  //       }
  //       catch {
  //         return Promise.reject({success: false, error: "Unable to get faqs"})
  //       }
	// 		})
	// 		.catch( err => Promise.reject(err))
  return Promise.resolve({faqs: [
    {question: "What is ore?", answer: "Ore is a stone that contains large quantity of a required element"},
    {question: "What is ore?", answer: "Ore is a stone that contains large quantity of a required element"}
  ]})
}