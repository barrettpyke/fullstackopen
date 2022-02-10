//TO DO: change to all stats component > step6

import React, { useState, useEffect } from 'react';

const Button = ({ name, onClick }) => {
  return(
    <>
    <button onClick={onClick}>
    {name}  
    </button> 
    </>
  )
}

const AllStats = ({ good, bad, neutral, total, average, positive }) => {
  return(
    <table>
      <tbody>
        <Stat name="good" value={good} />
        <Stat name="neutral" value={neutral} />
        <Stat name="bad" value={bad} />
        <Stat name="total" value={total} />
        <Stat name="average" value={average} />
        <Stat name="positive" value={positive} />
      </tbody>
    </table>
  )
}

const Stat = ({ name, value }) => {
  if (name === "positive") {
    return(
      <>
        <tr>
          <td>{name}</td>
          <td>{value}%</td>
        </tr>
      </>
    )
  }
  return(
    <>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral ] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setAverage((good - bad) / total);
    setTotal(good + bad + neutral);
    setPositive((good / total) * 100);
  }, [ good, bad, neutral, total ]);
  
  if (total === 0) {
    return(
      <div>
        <h1>Give Feedback</h1>
        <Button name="good" onClick={() => setGood(good + 1)} />
        <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button name="bad" onClick={() => setBad(bad + 1)} />
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    )
  } else {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" onClick={() => setGood(good + 1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setBad(bad + 1)} />
      <h2>Statistics</h2>
      <AllStats 
        good={good} 
        bad={bad} 
        neutral={neutral} 
        positive={positive} 
        average={average} 
        total={total} 
      />
    </div>
  );
  }
}

export default App;
