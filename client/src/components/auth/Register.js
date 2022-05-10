import React, { useState } from "react";
import { Alert, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// import useMutation
import { useMutation } from "react-query";

//import API
import { API } from "../../config/api";

// let navigate = useNavigate();
function Register() {
  const title = "Register";
  document.title = "DumbMerch | " + title;

  const [message, setMessage] = useState(null);

  // creating var state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // define var state
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // function for handle insert data to databases (useMutation)
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);
      console.log(body);
      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      // condition register success
      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <Card bg="dark" className="p-4">
        <div style={{ fontSize: "36px", lineHeight: "49px", fontWeight: "700" }} className="mb-2 sub-headline">
          Register
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange} className="px-3 py-2" />
            <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} className="px-3 py-2 mt-3" />
            <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} className="px-3 py-2 mt-3" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="danger py-2">
              Register
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
