import { useState, useEffect } from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';

export default function App() {
  const [count, setCount] = useState(0)
  const [todoList, setTodoList] = useState([])

  /* axios.get('http://localhost:8000/api/todos')
  .then(res => {data = res.data}) */

  useEffect(() => {
    axios.get("http://localhost:8000/api/todos/")
    .then(res => setTodoList(res.data))
  
    //console.log(todoList)
    
  },[count])

  const todoElements = todoList.map(item => (
    <p key={nanoid()}>{item}</p>
  ))

  //to read: https://www.g2i.co/blog/understanding-the-objects-are-not-valid-as-a-react-child-error-in-react

  return (
    <div className="App">
      {todoElements}
    </div>
  )
}

