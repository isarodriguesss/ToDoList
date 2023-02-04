import { useState, useEffect } from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';

export default function App() {
  const [count, setCount] = useState(0)
  const [todoList, setTodoList] = useState([])

  const [formData, setFormData] = useState(
    {
      'completed': true
    }
  )

  useEffect(() => {
    axios.get("http://localhost:8000/api/todos/")
    .then(res => setTodoList(res.data))
    
  },[count])

  function handleIsCompleted(event, id) {
    const updateTodoList = todoList.map(item => {
      return item.id === id? {
        ...item, 
        [event.target.name]: event.target.checked
      } : item
    })
    setTodoList(updateTodoList)
  }

  const todoElements = todoList.map(item => (
    <div key={nanoid()}>
      <p>{item.title}: {item.description}</p>
      <form>
        <input 
          type='checkbox'
          checked={item.completed}
          id='completed'
          onChange={(e) => handleIsCompleted(e, item.id)}
          name='completed'
          />
          <label htmlFor='completed'> Task completed?</label>
      </form>
    </div>
    
  ))

  //to read: https://www.g2i.co/blog/understanding-the-objects-are-not-valid-as-a-react-child-error-in-react

  return (
    <div className="App">
      {todoElements}
    </div>
  )
}

