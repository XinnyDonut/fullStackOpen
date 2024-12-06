import { useState } from 'react'

const Button=({text,onClick})=><button onClick={onClick}>{text}</button>
const Header=({text})=><h2>{text}</h2>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const rand=(min,max)=>{
    min=Math.ceil(min)
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min)
  }
  const votesObj=function(){
   return anecdotes.reduce((obj,current,i)=>{
      obj[i]=0
      return obj
    },{})
  }
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(votesObj())
  const [anecIndex,setAnecIndex]=useState(0)

  const handleSetSelected=()=>{
    setSelected(rand(0,anecdotes.length-1));
  }
  
  const handleVoteClick=()=>{
   const newVote={...votes,[selected]:votes[selected]+1}
   setVotes(newVote)   
  let biggest=0
  let biggestI
  for(let i=0;i<anecdotes.length;i++){
    if((newVote[i])>biggest){
      biggest=newVote[i]
      biggestI=i;
    }
  }
  setAnecIndex(biggestI)

  }
      


  return (
    <div>
      <Header text='Anecdote of the day'/>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <Button onClick={handleVoteClick} text='vote'/>
        <Button onClick={handleSetSelected} text='next anecdote'/>
      </div>
      <Header text='Anecdote with most votes'/>
      {anecdotes[anecIndex]}
    </div>
  )
}

export default App