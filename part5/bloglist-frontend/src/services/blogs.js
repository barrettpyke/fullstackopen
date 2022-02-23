import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const remove = blogToDelete => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }