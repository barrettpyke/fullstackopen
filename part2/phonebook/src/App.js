import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import './index.css';

const Search = ({ search, searchChange }) => {
  return(
    <div>
      Search: <input value={search} onChange={searchChange} />  
    </div>
  );
}

const AddNew = ({ addName, newName, nameChange, newNumber, numberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={nameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

const Person = ({ name, number, id }) => {
  
  const handleClick = () => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
    personService.deleteRes(id);
    window.location.reload(false);
    }
  }
  
  return ( 
  <>
  <li key={id}>
    {name} {number}
    <button className='padding' onClick={handleClick}>Delete</button>
  </li>
  </>
  )
}

const Notification = ({ message, messageClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState('success');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, [])

  const nameChange = (e) => {
    setNewName(e.target.value);
  }

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const searchChange = (e) => {
    setSearch(e.target.value);
    setShowAll(false);
  }

  const personsToShow = showAll ? persons : 
    persons.filter(person => person.name.toLowerCase().includes(search));

  const addName = (e) => {
      e.preventDefault();
      if (!persons.some(person => person.name === newName)) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            let errorResp = JSON.stringify(error.response.data.error)
            setMessage(errorResp);
            setMessageClass('error');
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } else if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
          let match = persons.filter(person => person.name === newName);
          const personObject = {
            name: newName,
            number: newNumber
          }
          personService
          .update(match[0].id, personObject)
          .catch(error => {
            let errorResp = JSON.stringify(error.response.data.error)
            setMessage(errorResp);
            setMessageClass('error');
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      setNewName('');
      setNewNumber('');
      setMessage(`Added ${newName}.`);
      setMessageClass('success');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass} />
      <Search search={search} searchChange={searchChange} />
      <h2>Add New</h2>
      <AddNew 
        addName={addName} 
        newName={newName} 
        nameChange={nameChange} 
        newNumber={newNumber} 
        numberChange={numberChange} 
      />
      <h2>Numbers</h2>
      <ul> 
        {personsToShow.map(person =>
          <Person key={person.id} name={person.name} number={person.number} id={person.id} />
        )}
      </ul>
    </div>
  )
}

export default App;