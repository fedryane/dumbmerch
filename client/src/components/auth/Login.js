import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Alert, Card, Button } from "react-bootstrap";

function Login() {
  let navigate = useNavigate();
  const title = "Login";
  document.title = "DumbMerch | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  // creating var state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // define var state
  const { email, password } = form;

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

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response.data.data);

      // condition login
      if (response?.status === 201) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      if (response.data.data.status === "admin") {
        navigate("/complain");
      } else {
        navigate("/");
      }

      setMessage("login success");

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
          Login
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange} className="px-3 py-2 mt-3" />
            <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} className="px-3 py-2 mt-3" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="danger py-2">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
