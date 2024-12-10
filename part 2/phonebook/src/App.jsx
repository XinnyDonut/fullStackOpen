import { useState,useEffect } from 'react'
import personsService from './service/persons' 

const Person=({array,handler})=>array.map(p=><p key={p.id}>{p.name} {p.number}<button onClick={()=>handler(p.id)}>delete</button></p>)

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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchName,setSearchName]=useState('')

  useEffect(()=>{
    personsService
    .load()
    .then(data=>setPersons(data)
    )}
  ,[])
 

  const addPerson=(event)=>{
    event.preventDefault();
    const personObj={
      name:newName,
      number:newNumber,
    }
    const names=persons.map(x=>x.name)
    if(names.includes(personObj.name)){
      const confirmed=window.confirm(`${personObj.name} is already added to the book, replace old number with the new one?` )
      if(confirmed){
        const existPerson=persons.find(x=>x.name===personObj.name)
        personsService
          .update(existPerson.id,{...existPerson,number:newNumber})
          .then(returnedPerson=>setPersons(persons.map(x=>x.id===existPerson.id?returnedPerson:x)))
        setNewName("")
        setNewNumber('')
      }
     
    }else{  
      personsService
        .add(personObj)
        .then(returnedPerson=>setPersons(persons.concat(returnedPerson)))
          
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
  
  const deletePerson=(id)=>{
  const toDelete=persons.find(person=>person.id===id);
    if(window.confirm(`Delete ${toDelete.name}`)){
      personsService
      .deleteServ(id)
      .then(returnedPerson=>setPersons(persons.filter(p=>p.id!==returnedPerson.id)))
    } 
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
      <Person array={showFiltered()} handler={deletePerson}/>   
    </div>
  )
}

export default App