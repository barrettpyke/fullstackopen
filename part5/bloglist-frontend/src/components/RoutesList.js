import { Routes, Route } from 'react-router-dom'
import App from '../App'
import Users from './Users'
import UserDetails from './UserDetails'
import BlogDetails from './BlogDetails'

const RoutesList = () => {
  return (
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/:id" element={<UserDetails />} />
    <Route path="/blogs/:id" element={<BlogDetails />} />
  </Routes>
  )
}

export default RoutesList