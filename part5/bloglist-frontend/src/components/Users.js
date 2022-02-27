import { useEffect, useState } from 'react'
import Home from './Home'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers ] = useState([])

  useEffect( async () => {
    const response = await userService.getAllUsers()
    setUsers(response)
  }, [])

  return (
    <div>
      <Home />
      <h2>Users</h2>
      <table>
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((user) => (
        <tr key={user.id}>
          <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
      </table>
    </div>
  )
}

export default Users