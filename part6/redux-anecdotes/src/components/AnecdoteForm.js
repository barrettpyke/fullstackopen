import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCall } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.notificationCall({ notification: `You added ${content}`, timeout: 5 })
    props.createAnecdote(content)
  }

  return (
  <div>
  <h2>create new</h2>
    <form onSubmit={addAnec}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

const mapDispatchToProps = { 
  notificationCall,
  createAnecdote
}

const AnecdoteFormConnect = connect(null, mapDispatchToProps)(AnecdoteForm)

export default AnecdoteFormConnect