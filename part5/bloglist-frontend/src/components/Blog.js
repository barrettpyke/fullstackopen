import { React, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [ viewDetails, setViewDetails ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!viewDetails) {
    return(
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button id="view-button" buttonlabel="View" style={{ marginLeft: 5 }} type='button' onClick={() => {
            setViewDetails(!viewDetails)}}>
              View
          </button>
        </div>
      </div>
    )
  } else if (viewDetails && blog.user === user) {
    return(
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button style={{ marginLeft: 5 }} type='button' onClick={() => setViewDetails(!viewDetails)}>
          Hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button id="likes-button" data-testid="likes" style={{ marginLeft: 5 }} type='button' onClick={addLike}>Like</button>
        </div>
        <div>
          <button id="delete-button" type='button' onClick={deleteBlog}>
            Delete
          </button>
        </div>
      </div>
    )
  } else {
    return(
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button style={{ marginLeft: 5 }} type='button' onClick={() => setViewDetails(!viewDetails)}>
          Hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button id="likes-button" data-testid="likes" style={{ marginLeft: 5 }} type='button' onClick={addLike}>Like</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.string
}

export default Blog