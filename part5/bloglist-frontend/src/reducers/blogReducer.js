import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      state = []
      return state.concat(blogs).sort(function (a, b) {
        return b.likes - a.likes;
      })
    },
    createBlog(state, action) {
      const newBlog = action.payload
      return state.push(newBlog).sort(function (a, b) {
        return b.likes - a.likes;
      })
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const filterBlogs = (userId) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const userBlogs = blogs.filter(blog => blog.user === userId)
    dispatch(setBlogs(userBlogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = blogService.create(blogObject);
    dispatch(addBlog(newBlog))
  }
}

export const { setBlogs, addBlog } = blogsSlice.actions
export default blogsSlice.reducer