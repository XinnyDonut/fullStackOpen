import { useState } from 'react'
const Header=({text})=><h2>{text}</h2>
const Button=({onClick,text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics=({text,num})=>
<tr>
  <td>{text}</td>
  <td>{num}</td>
</tr>

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
      {total===0?<p>No feedback given</p>:
      <table>
        <tbody>
        <Statistics text='good' num={good} />
        <Statistics text='neutral' num={neutral} />
        <Statistics text='bad' num={bad} />
        <Statistics text='all' num={total} />
        <Statistics text='average' num={showAve()} />
        <Statistics text='positive' num={showPercent()} />
        </tbody>
      </table>
    }         
    </div>
  )
}

export default App