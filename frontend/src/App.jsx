import { useState, useEffect } from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';

export default function App() {
  const [count, setCount] = useState(0)
  const [todoList, setTodoList] = useState()

  /* axios.get('http://localhost:8000/api/todos')
  .then(res => {data = res.data}) */

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("http://localhost:8000/api/todos")
      const data = await res.json()
      setTodoList(data)
      console.log(data)
    }
    
  },[count])

  

  /* const resultElements = todoList.map(item => {
    return (
      <p key={nanoid()}>{item}</p>
    )
  }) */

  return (
    <div className="App">
      <p>teste</p>
      {/* {resultElements} */}
      {todoList}
    </div>
  )
}

