import { useState, useEffect } from 'react'
import personService from './services/persons'

const Contact = ({name, number, deletePerson}) => {
  const buttonLabel = "delete"
  return (
    <li>
      {name} {number} <button onClick={deletePerson}>{buttonLabel}</button>
    </li>

  )
}

const Contacts = ({persons, deleteHandler}) => {

  return (
    persons.map((person, i) => <Contact key={i} name={person.name} number={person.number} deletePerson={() => deleteHandler(person.name, person.id)}/>)
  )
}

const Filter = ({condition, handleConditionChange}) => {
  return (
    <div>
        filter shown with<input value={condition} onChange={handleConditionChange}/>
    </div>
  )
}

const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const SystemMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [condition, setCondition] = useState('')
  const [systemMessage, setSystemMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const deleteSelectedPerson = (name, id) => {
    if (window.confirm(`Really delete ${name}??`)) {
      console.log(`person ${id} should be deleted`)
      personService
        .deletePersonFromServer(id)
        setPersons(persons.filter(person => person.id !== id))
      raiseMessage(`Deleted ${name}`)
    } else {
      console.log(`${name} will not be deleted`)
    }
  }


  const alertIfPersonExists = () => {
    const existingNames = persons.map(person => person.name)
    if (existingNames.includes(newName)) {
      // no need for alert, as we replace the person
      // alert(`${newName} is already added to phonebook.`)
      return true
    }
    return false
  }

  const getPersonId = (name) => {
    console.log(`wanted name: ${name}`)
    const wantedPerson = persons.find(person => person.name === name)
    console.log(`wanted person: ${wantedPerson}`)
    return wantedPerson.id
  }

  const confirmChange = (name) => {
    if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
      console.log(`changing number of ${name}`)
      return true
    } else {
      console.log(`do nothing to ${name}`)
      return false
    }
  }

  const raiseMessage = (message) => {
    setSystemMessage(
      message
    )
    setTimeout(() => {
      setSystemMessage(null)
    }, 5000)
  }

  const raiseError = (message) => {
    setErrorMessage(
      message
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addContact = (event) => {
    // prevent redirect
    event.preventDefault()
    // create the new person based on current info
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (!alertIfPersonExists()) {
      // no such person yet
      // add the person to server
      personService
        .create(contactObject)
        .then(returnedPerson => {
          // render the new contact with help of state
          setPersons(persons.concat(returnedPerson))
        })
        raiseMessage(`Added ${newName}`)
    }
    else if (confirmChange(newName)){
      // change the person on server
      personService
        .changePersonOnServer(contactObject, getPersonId(newName))
        .then(returnedPerson => {
          console.log(`returned person:`)
          console.log(returnedPerson)
          // render the contacts with help of state
          // returnedPerson is the person that was changed
          const remainingPersons = persons.filter(person => person.id != getPersonId(newName))
          setPersons(remainingPersons.concat(returnedPerson).sort((a, b) => a.name.localeCompare(b.name)))
          raiseMessage(`Updated ${newName}`)
        })
        .catch(error => {
          raiseError(`Information of ${newName} has already been removed from server.`)
        })
    }
    // else: we just clear the inputs like we do anyway
    // clear the input field
    console.log("clearing name and number")
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // keep track of form input field
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // keep track of form input field
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleConditionChange = (event) => {
    // keep track of form input field
    console.log(event.target.value)
    setCondition(event.target.value)
  }

  const contactsToShow = condition === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(condition.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage}/>
      <SystemMessage message={systemMessage}/>
      <Filter condition={condition} handleConditionChange={handleConditionChange}/>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      <Contacts persons={contactsToShow} deleteHandler={deleteSelectedPerson}/>
      </ul>
    </div>
  )

}

export default App
