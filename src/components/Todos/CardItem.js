import React, { useState } from 'react';
import { Card, CardText, Form, Input, Label, CardBody, CardTitle, CardSubtitle, Button, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';

import './card.css';

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datepicker';


import { deleteTodo, getList, editTodo } from '../../actions';
import axiosWithAuth from '../../utils/axiosWithAuth';


const CardItem = props => {

  const currentDate = new Date(2017, 5, 25);


  const initFormData = {
    id: Date.now(),
    title: '',
    description: '',
    completeDate: '',
    complete: 0,
    users_id: 2
  }

  const [editing, setEditing] = useState(false);

  const [dataToEdit, setDataToEdit] = useState({});

  const [formData, setFormData] = useState(initFormData);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setDataToEdit({ ...dataToEdit, [name]: value });
  };

  const dateChange = date => {
    setFormData({ ...formData, completeDate: date })
  }

  const handleClick = () => {
    const newFormData = {
      ...dataToEdit,
      completeDate: Date.now()
    };
    props.editTodo(newFormData)
      .then(() => props.getList());
  };

  const changeStyling = () => {
    if (props.props.complete === 1) {
      return 'completed_now';
    }
  }

  return (
    <div className='cardItem'>

      <Card width='33%' className={changeStyling()}>

        <CardBody>
          <CardTitle>Task: {props.props.title}</CardTitle>
          <CardSubtitle>Description: {props.props.description}</CardSubtitle>
          <CardText>Due date: {props.props.completeDate}</CardText>
          <Button
            color="primary"
            className="edit_task"
            onClick={
              e => {
                e.stopPropagation();
                setEditing(true);
                axiosWithAuth()
                  .get(`/api/task/${props.props.id}`)
                  .then(res => {
                    setDataToEdit(res.data);
                  })
                  .catch(err => console.log(err))
              }}>Edit</Button>

          <Button
            color='danger'
            className="delete_task"
            onClick={
              e => {
                e.stopPropagation();
                props.deleteTodo(props.props).then(() => props.getList());
              }
            }>Delete</Button>
          <CardText>{props.props.due_date}</CardText>
          <Button
            color="success"
            className="completed_button"
            onClick={
              e => {
                e.preventDefault();
                setFormData(
                  props.props.complete = 1)
              }}

          >Mark complete</Button>
        </CardBody>

        {editing &&
          <Form className="todo-form"
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              handleClick();
            }} >
            <CardTitle>Add your next todo</CardTitle>
            <CardBody>
              <FormGroup>
                <Input
                  type='text'
                  name="title"
                  placeholder="Task title"
                  onChange={handleChange}
                  value={dataToEdit.title} />
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  name="description"
                  placeholder="Describe your task"
                  onChange={handleChange}
                  value={dataToEdit.description} />
              </FormGroup>
              <FormGroup>
                <Label for="data">Due date</Label><br />
              </FormGroup>
              <Button type="submit">Submit Edits</Button>
            </CardBody>
          </Form>}
      </Card>
    </div >
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(
  mapStateToProps,
  { deleteTodo, getList, editTodo }
)(CardItem);