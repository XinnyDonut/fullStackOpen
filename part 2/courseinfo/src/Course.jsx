const Header=({text})=><h2>{text}</h2>
const Part=({text,num})=><p>{text} {num}</p>
const Content=({content})=>(
    <div>
      {content.map((e)=>(
        <Part key={e.id} text={e.name} num={e.exercises}/>
    ))}
      <Sum total={content.reduce((sum,e)=>{
        return sum+e.exercises
      },0)}/>
    </div>
)
const Sum=({total})=>(<h5>total of {total} exercise</h5>)


const SubCourse=({course})=>(
 <div>
      <Header text={course.name}/>
      <Content content={course.parts}/>
  </div>
)

const Course=({courses})=>(
<div>
  {courses.map((e,i)=>(
    <SubCourse key={e.id} course={courses[i]}/>
  ))}
</div>
)
export default Course