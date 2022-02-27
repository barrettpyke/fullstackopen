import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import './app.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer'
import Home from './components/Home'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const createFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const createNewBlog = (blogObject) => {
    try {
      createFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject))
      dispatch(setMessage({message: 'Message created.', messageClass: 'success'}));
      setTimeout(() => {
        dispatch(setMessage({message: null, messageClass: ''}));
      }, 5000);
    } catch (exception) {
      dispatch(setMessage({message: `${exception}`, messageClass: 'error'}));
      setTimeout(() => {
        dispatch(setMessage({message: null, messageClass: ''}));
      }, 5000);
    }
  };

  return (
    <div>
    <Home />
      <div>
        {blogs.map((blog) => (
            <Blog
            key={blog.id}
            blog={blog}
            />
        ))}
      </div>
      <Toggable buttonLabel="Create Blog" ref={createFormRef}>
        <CreateForm createBlog={createNewBlog} user={user} />
      </Toggable>
    </div>
  );
};

export default App;
