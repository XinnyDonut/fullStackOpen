import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Search=({value,onChange})=>
  <div>
    find countries <input value={value} onChange={onChange} />
  </div>

const Result=({array,handleClick})=>{
  if(array.length>10){
    return <p>Too many matches,specify another filter</p>
  }else if(array.length<10&&array.length>1){
    return <ul>{array.map((x,i)=>
      <li key={x.name.common}>{x.name.common} <button onClick={()=>handleClick(x)}>show</button></li>)}</ul>
  }
  return null
}
const Info=({country})=>{
  if(!country){
    return null
  }
  else{
    return <>
    <h2>{country[0]}</h2>
    <p>capital: {country[1]}</p>
    <p>area: {country[2]}</p>
    <h3>Languages</h3>
    <ul>
     {country[3].map(x=><li key={x}>{x}</li>)}
    </ul>
    <img src={country[4]}/>
  </>
  }
  
}

function App() {
  console.log("re-rendering..");

  const [input,setInput]=useState("")
  const [result,setResult]=useState([])
  const [country,setCountry]=useState(null)

  useEffect(()=>{
    if(input!==""){
      console.log("fetching country data...")
      
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
   
      .then(response=> 
        setResult(response.data.filter(x=>
            x.name.common.toLowerCase().includes(input.toLowerCase()))) 
      )  
      .catch(error => {
        console.error("Error fetching data:", error)
        setInput("")
      })
    }
  },[input])

  useEffect(()=>{
    if(result.length==1){
      console.log("finally one country is out")
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${result[0].name.common.toLowerCase()}`)
      .then(response=>{
        const obj=response.data
        const objArray=[]
        objArray.push(obj.name.common,obj.capital[0],obj.area.toString(),Object.values(obj.languages),obj.flags.png)
        console.log(objArray);
        setCountry(objArray)
      })  
    }
  },[result[0]])
  
  
  const handleChange=(event)=>{
    setInput(event.target.value)
  }
  const handleClick=(selectedCountry)=>{
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry.name.common.toLowerCase()}`)
      .then(response => {
        const obj = response.data
        const objArray = [
          obj.name.common, 
          obj.capital[0], 
          obj.area.toString(), 
          Object.values(obj.languages), 
          obj.flags.png
        ]
        setCountry(objArray)
      })
      .catch(error => {
        console.error("Error fetching country details:", error)
      })
  }
 
  return (
    <>
      <Search value={input} onChange={handleChange}/>
      <Result array={result} handleClick={handleClick}/>
      <Info country={country}/>
      
    </>
  )
}

export default App
