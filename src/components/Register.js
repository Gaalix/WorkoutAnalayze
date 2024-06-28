import React, { useState } from "react";
import { Button, Form, Message, Card } from "semantic-ui-react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("https:/raziprojekt.azurewebsites.net/users/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        fullname: fullname,
        password: password,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/login";
    } else {
      setUsername("");
      setPassword("");
      setEmail("");
      setFullname("");
      setError(data.message);
    }
  }

  return (
    <Card centered className="card-login">
      <Card.Content>
        <Form onSubmit={handleRegister} error={!!error}>
          <Form.Field>
            <label>Email</label>
            <Form.Input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <Form.Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Full Name</label>
            <Form.Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" color="blue">
            Register
          </Button>
          {error && (
            <Message error header="Registration Failed" content={error} />
          )}
        </Form>
      </Card.Content>
    </Card>
  );
}

export default Register;
