import axios from 'axios'
const baseUrl = 'api/users'

const getUserById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getUserById }