import { useEffect, useState } from 'react'
import Home from './Home'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filterBlogs } from '../reducers/blogReducer'

const UserDetails = () => {
  const [user, setUser ] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()
  const userBlogs = useSelector(store => store.blogs)

  useEffect( async () => {
    const response = await userService.getUserById(id)
    setUser(response)
    dispatch(filterBlogs(id))
  }, [])

  return (
    <div>
      <Home />
      <h3>{user.name}</h3>
      <ul>
      {userBlogs.map((blog) => (
      <li key={blog.id}>{blog.title}</li>
      ))}
      </ul>
    </div>
  )
}

export default UserDetails

