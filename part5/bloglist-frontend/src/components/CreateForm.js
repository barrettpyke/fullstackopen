import { useState } from 'react'

const CreateForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [website, setWebsite] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      website: website,
      user: user
    })
    setTitle('')
    setAuthor('')
    setWebsite('')
  }

  return(
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Website:
          <input
            id="website"
            type="text"
            value={website}
            name="website"
            onChange={({ target }) => setWebsite(target.value)}
          />
        </div>
        <button id="create-button" data-testid="submit" type="submit">Create New</button>
      </form>
    </div>
  )
}

export default CreateForm