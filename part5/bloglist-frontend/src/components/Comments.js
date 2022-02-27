import blogService from '../services/blogs'
import { useState } from 'react'

const Comments = ({comments, blogId}) => {
  const [newComment, setNewComment] = useState('')

  const addComment = (blogId, comment) => {
    blogService.addComment(blogId, comment)
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
      {comments?.map((comment) => (
        <li key={comment}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={() => addComment(blogId, newComment)}>
        <input type="text" onChange={(event) => setNewComment(event.target.value)}></input>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default Comments