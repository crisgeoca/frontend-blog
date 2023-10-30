import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLogingRequest() {
    const authCredentialsRequest = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(authCredentialsRequest),
    })
      .then((reponse) => {
        if (reponse.status === 200)
          return Promise.all([reponse.json(), reponse.headers]);
        else return Promise.reject("Invalid credentials");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "blog";
      })
      .catch((message) => {
        alert(message);
      });
  }
  return (
    <>
      <Container className="mt-5 w-25 justify-content-md-center">
        <Row>
          <Col>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="email"
              id="username"
              placeholder="username@email.com"
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
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-2 d-inline-flex gap-1">
            <Button
              id="login"
              type="button"
              onClick={() => sendLogingRequest()}
            >
              Login
            </Button>
            <Button
              id="signup"
              type="button"
              onClick={() => (window.location.href = "signup")}
            >
              Signup
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
