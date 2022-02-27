import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

    return (
      <div style={blogStyle}>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    );
    }

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.string,
};

export default Blog;
