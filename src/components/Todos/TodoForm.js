import React, { useState } from 'react';
import '../../App.css';
import "react-datepicker/dist/react-datepicker.css";

import { connect } from 'react-redux';

import { Card, CardTitle, Form, CardBody, FormGroup, Input, Button } from 'reactstrap';

import { addTodo, getList } from '../../actions';

function TodoForm(props) {

  const initFormData = {
    id: Date.now(),
    title: '',
    description: '',
    completeDate: '03/05/2020',
    complete: 1,
    users_id: 2
  }

  const [formData, setFormData] = useState(initFormData);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    props.addTodo(formData)
      .then(() => props.getList());
    setFormData(initFormData);
  };

  return (
    <Card>
      <Form className="todo-form"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          handleClick();
        }} >
        <CardTitle className='todo-title'>Add your next todo</CardTitle>
        <CardBody>
          <FormGroup>
            <Input
              type='text'
              name="title"
              placeholder="Task title"
              onChange={handleChange}
              value={formData.title} />
          </FormGroup>
          <FormGroup>
            <Input
              type='textarea'
              name="description"
              placeholder="Describe your task"
              onChange={handleChange}
              value={formData.description} />
          </FormGroup>
          <Button type="submit">Add</Button>

        </CardBody>
      </Form>
    </Card>

  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(
  mapStateToProps,
  { addTodo, getList }
)(TodoForm);
