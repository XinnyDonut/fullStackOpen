
const Header=(props)=><h1>{props.course}</h1>

const Part=({title,num})=>{ 
 return<p>{title} {num}</p>
}

const Content=({parts})=>{
  return (
    <div>
      {parts.map((part,index) => (
        <Part key={index} title={part.name} num={part.exercises} />
      ))}
    </div>
  );
}

const Total=({parts})=>{
let sum =parts.reduce((sum,current)=>
  {return sum+current.exercises}
  ,0)
 return  <p>Number of exercises {sum}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course['name']}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
