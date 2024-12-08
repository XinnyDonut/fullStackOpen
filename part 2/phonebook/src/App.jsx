import { useState } from 'react'

const Person=({array})=>array.map(p=><p key={p.id}>{p.name} {p.number}</p>)

const Search=({searchName,handleSearchChange})=>(
  <div>filter shown with
      <input
        value={searchName}
        onChange={handleSearchChange}
      />
  </div>
);

const PersonForm=({addPerson,newName,handleNameChange,newNumber,handleNumberChange})=>(
  <form onSubmit={addPerson}>
    <div>
      name: 
      <input 
        value ={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  console.log("Component re-rendered");
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')

  const addPerson=(event)=>{
    event.preventDefault();
    const personObj={
      name:newName,
      number:newNumber,
      id:persons.length+1
    }
    const names=persons.map(x=>x.name)
    if(names.includes(personObj.name)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObj))
      setNewName("")
      setNewNumber("")
    }  
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const handleSearchChange=(event)=>{
    setSearchName(event.target.value)
  }
  
  const showFiltered=()=>{
    if(searchName===""){
      return persons
    }else{ 
      return persons.filter(person=>person.name.toLowerCase().includes(searchName.toLowerCase()))
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                   handleNumberChange={handleNumberChange} newNumber={newNumber} 
      />
      <h3>Numbers</h3>
      <Person array={showFiltered()}/>   
    </div>
  )
}

export default App