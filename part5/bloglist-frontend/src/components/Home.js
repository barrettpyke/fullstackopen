import Notification from '../components/Notification'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { Link } from 'react-router-dom'

const Home = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    blogService.setToken(null);
    dispatch(setUser(null))
    setUsername('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user))

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setMessage({message: 'Incorrect credentials.', messageClass: 'error'}));
      setTimeout(() => {
        dispatch(setMessage({message: null, messageClass: ''}));
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Blog List</h1>
        <Notification />
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
            <button id="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  } else {
  return(
    <div>
      <h1>Blog List</h1>
      <Notification />
      <div>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>Blogs</h2>
    </div>
  )
  }
}

export default Home