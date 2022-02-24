import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const id = getId()
  const votes = 0
  const object = { 
    content: content, 
    id: id, 
    votes: votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (object) => {
  const newObject = { content: object.content, id: object.id, votes: object.votes + 1} 
  const response = await axios.put(`${baseUrl}/${object.id}`, newObject)
  return response.data
}

export default { 
  getAll,
createNew,
update }