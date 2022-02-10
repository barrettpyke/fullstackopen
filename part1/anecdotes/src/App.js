import React, { useState, useEffect } from 'react';

const Button = ({name, onClick}) => {
  return(
    <div>
      <button onClick={onClick}>
        {name}
      </button>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);
  const [highAnecdote, setHighAnecdote] = useState(0);
  
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voteSelected = () => {
    const copy = points.slice(0);
    copy[selected] += 1;
    setPoints(copy);
  }

  useEffect(() => {
    const highScore = Math.max(...points);
    const index = points.indexOf(highScore);
    setHighAnecdote(index);
  }, [points]);

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button name="Next Anecdote" onClick={randomAnecdote} />
      <Button name="Vote" onClick={voteSelected} />
      <h2>Anecdote with the Most Votes</h2>
      {anecdotes[highAnecdote]}
    </div>
  );
}

export default App;
