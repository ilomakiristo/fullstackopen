import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log("all persons fetched from server")
    return request.then(response => response.data)
  }

  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const deletePersonFromServer = personToDelete => {
    const request = axios.delete(`${baseUrl}/${personToDelete}`)
    console.log(`person ${personToDelete} deleted`)
    // request contains only deleted person
    console.log(request)
    return request.then(response => response.data)
  }

  const changePersonOnServer = (person, id) => {
    console.log(person)
    const request = axios.put(`${baseUrl}/${id}`, person)
    console.log(request)
    return request.then(response => response.data)

  }

  export default { getAll, create, deletePersonFromServer, changePersonOnServer }
