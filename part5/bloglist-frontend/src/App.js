import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function(a, b) {
        return b.likes - a.likes
      }))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUserId(user.id)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUserId(user.id)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Incorrect credentials.')
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = (blog) => {
    let blogToDelete = {
      title: blog.title,
      author: blog.author,
      id: blog.id,
      user: blog.user
    }
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      blogService
        .remove(blogToDelete)
      setTimeout(() => {blogService.getAll().then(blogs =>
        setBlogs(blogs.sort(function(a, b) {
          return b.likes - a.likes
        })))}, 500)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem(
      'loggedBlogUser'
    )
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addLike = (blog) => {
    let updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user
    }
    blogService.update(updatedBlog)
    setTimeout(() => {blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function(a, b) {
        return b.likes - a.likes
      })))}, 500)
  }

  const createBlog = (blogObject) => {
    try {
      createFormRef.current.toggleVisibility()
      blogService.create(blogObject)
      setMessage('Message created.')
      setMessageClass('success')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
      setTimeout(() => {blogService.getAll().then(blogs =>
        setBlogs(blogs.sort(function(a, b) {
          return b.likes - a.likes
        })))}, 5000)
    } catch (exception) {
      setMessage(`${exception}`)
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blog List</h1>
        <Notification message={message} messageClass={messageClass} />
        <div>
          <form onSubmit={handleLogin}>
            <div>
            Username:
              <input
                type="text"
                value={username}
                name="Username"
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            Password:
              <input
                type="password"
                value={password}
                name="Password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id="login-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Blog List</h1>
        <Notification message={message} messageClass={messageClass} />
        <div>
          <p>{user.name} logged in</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={userId} addLike={() => addLike(blog)} deleteBlog={() => deleteBlog(blog)} />
        )}
      </div>
      <Toggable buttonLabel="Create Blog" ref={createFormRef}>
        <CreateForm createBlog={createBlog} user={user} />
      </Toggable>
    </div>
  )
}

export default App