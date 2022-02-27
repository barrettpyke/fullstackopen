import { useEffect, useState } from 'react'
import Home from './Home'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const BlogDetails = () => {
  const [blog, setBlog] = useState('')
  const id = useParams().id

  useEffect( async () => {
    const response = await blogService.getById(id)
    console.log(response)
    setBlog(response)
  }, [])

  const deleteBlog = (blog) => {
    let blogToDelete = {
      title: blog.title,
      author: blog.author,
      id: blog.id,
      user: blog.user,
    };
    if (
      window.confirm(
        `Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      blogService.remove(blogToDelete);
    }
  };

  const addLike = (blog) => {
    let updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user,
    };
    blogService.update(updatedBlog);
  };

  return (
    <div>
      <Home />
      <h3>{blog.title} by {blog.author}</h3>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <button onClick={() => deleteBlog(blog)}>Delete</button>
      <button onClick={() => addLike(blog)}>Like</button>
      <Comments comments={blog.comments} blogId={blog.id} />
    </div>
  )
}

export default BlogDetails

