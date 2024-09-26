import { useState, useEffect } from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';
import Modal from './CustomModal'

export default function App() {
  const [count, setCount] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8000/api/todos/")
    .then(res => setTodoList(res.data))
    
  },[count])

  function handleUpdate(event, id) {
    const {name, value, type, checked} = event.target
    const updateTodoList = todoList.map(item => {
      return item.id === id? {
        ...item, 
        [name]: type === "checkbox" ? checked : value
      } : item
    })
    setTodoList(updateTodoList)
    const element = updateTodoList.find(item => item.id == id)
    axios.put(`http://localhost:8000/api/todos/${id}/`, element)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(todoList)
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:8000/api/todos/${id}/`)
    //setCount(!count) find out how to refresh api when deleting an element
  }

  function handleCreate() {
    const item = {title: "teste2", description: "teste2", completed: false}
    setTodoList([...todoList, item])
    axios.post("http://localhost:8000/api/todos/", item)
  }

  function handleToggle() {
    setToggle(!toggle)
  }

  const todoElements = todoList.map(item => (
    <div key={nanoid()}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={item.title}
          onChange={(e) => handleUpdate(e, item.id)}
          name="title"
        />
        <textarea
          value={item.description}
          onChange={(e) => handleUpdate(e, item.id)}
          name="description"
        />
        <input 
          type='checkbox'
          checked={item.completed}
          id='completed'
          onChange={(e) => handleUpdate(e, item.id)}
          name='completed'
          />
          <label htmlFor='completed'> Task completed??</label>
      </form>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </div>
    
  ))

  return (
    <div className="App">
      {todoElements}
      <button onClick={handleCreate}>New</button>
      <button onClick={handleToggle}>Open Modal</button>
      <Modal 
        toggle={toggle}
        handleToggle={handleToggle}
      />
    </div>
  )
}

