import React, { useState } from 'react';

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
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Person = ({ name, number }) => {
  return <><li key={name}>{name} {number}</li></>
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '123-456-789' 
    },
    {
      name: 'Bob Baker',
      number: '123-456-7899'
    },
    {
      name: 'John Smith',
      number: '455-666-5555'
    },
    {
      name: 'Crystal Lowes',
      number: '123-456-7889'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

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
        const nameObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(nameObject));
        setNewName('');
        setNewNumber('');
      } else {
        alert(`${newName} is already in the phonebook.`);
      }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
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
          <Person name={person.name} number={person.number}/>
        )}
      </ul>
    </div>
  )
}

export default App;