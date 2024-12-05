import { useState } from 'react'
const Header=({text})=><h2>{text}</h2>
const Button=({onClick,text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Display=({text,total})=><p>{text} {total}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne=()=>{
    setGood(good+1)
  }
  const increaseNeutralByOne=()=>{
    setNeutral(neutral+1)
  }
  const increaseBadByOne=()=>{
    setBad(bad+1)
  }


  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={increaseGoodByOne} text='good'/>
      <Button onClick={increaseNeutralByOne} text='neutral'/>
      <Button onClick={increaseBadByOne} text='bad'/>
      <Header text='statistics'/>
      <Display text='good' total={good}/>
      <Display text='neutral' total={neutral}/>
      <Display text='bad' total={bad}/>

    </div>
  )
}

export default App