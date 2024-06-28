import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { Button, Form, Card } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";

function EditProfile(props) {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({ ...userContext.user }); // Initialize user state with a copy of userContext.user
  const navigate = useNavigate();

  useEffect(() => {
    setUser({ ...userContext.user }); // Update user state when userContext.user changes
  }, [userContext.user]);

  const handleChange = (event, { name, value }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Updating user profile");
    console.log(user);
    var id = user._id;
    const response = await fetch(`https:/raziprojekt.azurewebsites.net/users/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data = await response.json();
    console.log("Updated user profile")
    console.log(data);
    if (userContext.setUser) {
      userContext.setUser(data);
    }
    navigate("/profile");
  }

  return (
      <Card centered className="card-login">
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Input
                label="Username"
                type="text"
                name="username"
                value={user.username || ""}
                onChange={handleChange}
            />
            <Form.Input
                label="Email"
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
            />
            <Form.Input
                label="Age"
                type="number"
                name="age"
                value={user.age || ""}
                onChange={handleChange}
            />
            <Form.Input
                label="Sex"
                type="text"
                name="sex"
                value={user.sex || ""}
                onChange={handleChange}
            />
            <Form.Input
                label="Weight"
                type="number"
                name="weight"
                value={user.weight || ""}
                onChange={handleChange}
            />
            <Form.Input
                label="Height"
                type="number"
                name="height"
                value={user.height || ""}
                onChange={handleChange}
            />
            <Button type="submit">Update Profile</Button>
          </Form>
          <Link to="/profile">
            <Button>Cancel</Button>
          </Link>
        </Card.Content>
      </Card>
  );
}

export default EditProfile;