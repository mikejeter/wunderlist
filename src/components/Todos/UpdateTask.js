import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

import "react-datepicker/dist/react-datepicker.css";

import { Card, CardTitle, Form, CardBody, FormGroup, Input, Label, Col, Button } from 'reactstrap';

import DatePicker from 'react-datepicker';


const emptyTask = {
    id: Date.now(),
    category: 'home',
    title: 'sample data',
    description: 'sample description here',
    completeDate: 'SOON',
    complete: 0

}

const UpdateTask = props => {
    const [editing, setEditing] = useState(true);
    const [taskToEdit, setTaskToEdit] = useState(emptyTask)

    const editTask = task => {
        setEditing(true);
        setTaskToEdit(task);
    };



    useEffect(() => {

        axiosWithAuth()
            .get(`/api/task/${props.match.params.id}`)
            .then(res => setTaskToEdit(res.data))
            .catch(err => console.log(err))
    }, [props.match.params.id])

    console.log('test if task is updated', taskToEdit);

    const changeHandler = e => {
        // e.persist();
        let value = e.target.value;

        setTaskToEdit({
            ...taskToEdit,
            [e.target.name]: value
        })
    }

    const handleChange = evt => {
        // const { name, value } = evt.target;
        // console.log(formData)
        // setFormData({ ...formData, [name]: value });
    };

    const dateChange = date => {
        // setDate(date);
        // setFormData({ ...formData, completeDate: date })
        // console.log('DATE:', date);
        // console.log('formdata have date?', formData)
    }

    const handleClick = () => {
        // const newFormData = {
        //     ...formData,
        //     completeDate: "hello world"
        // };
        // console.log('new form data', newFormData)
        // console.log('testing handleClick', formData.completeDate)
        // props.addTodo(newFormData)
        //     .then(() => props.getList());
        // setFormData(initFormData);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const updatedTask = taskToEdit;

        axiosWithAuth()
            .put(`http://localhost:5000/api/movies/${taskToEdit.id}`, updatedTask)
            .then(res => {
                props.history.push("/")
            })
            .catch(err => console.error(err))

    }



    return (
        <Card>
            <Form className="edit-todo-form"
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick();
                }} >
                <CardTitle>Edit this task:</CardTitle>
                <CardBody>
                    <FormGroup>
                        <Input
                            type='text'
                            name="title"
                            placeholder="Task title"
                            onChange={handleChange}
                            value={taskToEdit.title} />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type='textarea'
                            name="description"
                            placeholder="Describe your task"
                            onChange={handleChange}
                            value={taskToEdit.description} />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="data" sm={4}>Due date</Label>
                        <Col sm={8}>
                            <DatePicker name='date' selected={taskToEdit.completeDate} onChange={dateChange} />
                        </Col>
                    </FormGroup>
                    <Button type="submit">Submit edited data</Button>
                    {/* <Button onClick={props.clearTodos}>Clear all</Button> */}
                </CardBody>
            </Form>
        </Card>
    )
}

export default UpdateTask;