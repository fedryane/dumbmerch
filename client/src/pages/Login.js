import React from "react";
import LandingPage from "../components/landingPage/LandingPage";
import AuthLogin from "../components/auth/Login";
import { Button, Col, Container, Row } from "react-bootstrap";
import Merch from "../assets/Frame.png";
import "../pages/VarCSS.css";
import {Link} from "react-router-dom"

function Login() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="8">
            <img src={Merch} className="img-fluid" style={{ width: "264px", height: "264px" }} alt="brand" />
            <div className="main mt-4">Easy, Fast and Reliable</div>
            <p className="sub mt-3">
              Go shopping for merchandise, just go to dumb merch <br /> shopping. the biggest merchandise in <b>Indonesia</b>
            </p>
            <div className="mt-5">
              <Button variant="danger px-5">Login</Button>
              <Link to="/register" >
              <Button variant="dark ms-1 px-5">Register</Button>
              </Link>
            </div>
          </Col>
          <Col md="4">
            <AuthLogin />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
