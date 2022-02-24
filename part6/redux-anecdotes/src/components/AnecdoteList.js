import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notificationCall } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const filterString = useSelector(state => state.filters)
  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filterString)) 
  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
    console.log('vote', id)
    const updateObject = { id: id, content: content, votes: votes }
    dispatch(notificationCall({ notification: `You voted ${content}`, timeout: 5 }))
    dispatch(anecdoteVote(updateObject))
  }
  
  if (filterString === '') {
    return(
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
          </div>
        )}
      </div>
      )
  } else {
    return(
      <div>
        {filteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
          </div>
        )}
      </div>
      )
  }
}

export default AnecdoteList