import { useState } from 'react'
const Header=({text})=><h2>{text}</h2>
const Button=({onClick,text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Display=({text,num})=><p>{text} {num}</p>

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
  const total=good+neutral+bad

  const showAve=()=>{
    if(total===0){
      return ''
    }
    return (good*1+bad*(-1))/total
  }
  const showPercent=()=>{
    if(total==0){
      return ""
    }
    return good/total*100+"%"
  }
  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={increaseGoodByOne} text='good'/>
      <Button onClick={increaseNeutralByOne} text='neutral'/>
      <Button onClick={increaseBadByOne} text='bad'/>
      <Header text='statistics'/>
      <Display text='good' num={good}/>
      <Display text='neutral' num={neutral}/>
      <Display text='bad' num={bad}/>
      <Display text='all' num={total}/>
      <Display text='average' num={showAve()}/>
      <Display text='positive' num={showPercent()}/>
    </div>
  )
}

export default App