import React, { useState } from "react";
import Register from './Register';
import { Button, Form, FormGroup, Input, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axiosWithAuth from "../../utils/axiosWithAuth";

const Login = props => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", data)
      .then(response => {
        console.log(response);
        window.localStorage.setItem("token", response.data.token);
        props.history.push("/list");
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Sign in</h1>
      <Form className="login" onSubmit={handleSubmit}>
        <FormGroup>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Input type="text" name="username" id="username" placeholder="Username" value={data.username} onChange={handleChange} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <Input type="password" name="password" id="Password" placeholder="Password" value={data.password} onChange={handleChange} />
          </Col>
        </FormGroup>
        <Button className="login-button">Login</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Register />
          </ModalBody>
          <ModalFooter>
            <Button className="register-button" color="primary" onClick={toggle}>Done</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Button className="register-button" onClick={toggle}>Register</Button>
      </Form>
    </div>
  );
};

export default Login;