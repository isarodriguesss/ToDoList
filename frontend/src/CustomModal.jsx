import {  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { useState } from "react";

export default function CustomModal (props) {
  const [form, setForm] = useState({ title: "", description: "", completed: false })
  /* constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: this.state.modal
    })
  } */

  function handleCreate(e) {
    const { name, type, value, checked } = e.target
    setForm(preForm => {
      return {
        ...preForm,
        [name]: type == 'checkbox' ? checked : value
      }
    })
  }

  function handleSubmit() {
    axios.post("http://localhost:8000/api/todos/", form)
    props.handleToggle()
  }

  return (
    <Modal isOpen={props.toggle}>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={form.title}
              onChange={(e) => handleCreate(e)}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={form.description}
              onChange={(e) => handleCreate(e)}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={form.completed}
                onChange={(e) => handleCreate(e)}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Do Something</Button>{' '}
        <Button color="secondary" onClick={props.handleToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
  
}
