import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import { Button, Form, Message, Card } from "semantic-ui-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("https:/raziprojekt.azurewebsites.net/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      userContext.setUserContext(data);
    } else {
      setUsername("");
      setPassword("");
      setError(data.message);
    }
  }

  return (
    <Card centered className="card-login">
      <Card.Content>
        <Form onSubmit={handleLogin} error={!!error}>
          {userContext.user ? <Navigate replace to="/Workouts" /> : ""}
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
            Log in
          </Button>
          {error && <Message error header="Login Failed" content={error} />}
        </Form>
      </Card.Content>
    </Card>
  );
}

export default Login;
