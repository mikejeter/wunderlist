import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Col } from 'reactstrap';
import axiosWithAuth from "../utils/axiosWithAuth";

const Register = props => {
  const [data, setData] = useState({
    email: "",
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
      .post("/api/auth/register", data)
      .then(response => {
        console.log(response);
        window.localStorage.setItem("token", response.data.token);
        props.history.push("/list");
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Form className="register" onSubmit={handleSubmit}>
      <FormGroup> 
        <Col xs="12" md={{ size: 6, offset: 3 }}>
        <Input type="text" name="email" id="email" placeholder="Email" value={data.email} onChange={handleChange} />
        </Col>
      </FormGroup>
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
      </Form>
    </div>
  );
};

export default Register;