import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createUserDto = {
    name: name,
    lastName: lastname,
    username: username,
    password: password,
  };
  function createUser() {
    fetch("/api/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(createUserDto),
    }).then((response) => {
      if (response.status === 200) alert("created");
    });
  }
  return (
    <>
      <Container className="mt-5 w-25 justify-content-md-center">
        <Row>
          <Col>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Type your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="lastname">Last name</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              placeholder="Type your last name"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="email"
              id="username"
              placeholder="Type your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Type your passwword"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            <Button onClick={() => createUser()}>Create user</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
