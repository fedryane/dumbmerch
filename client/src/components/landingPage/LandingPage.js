import React from "react";
import { Link } from "react-router-dom";
import Merch from "../../assets/Frame.png";

const LandingPage = () => {
  return (
    <div className="container col-md-6 text-lg-start text-center m-5">
      <div>
        <img src={Merch} className="img-fluid mb-4" alt="..."></img>
        <h1 className="mt-2 mb-3 text-light display-3">Easy, Fast and Reliable</h1>
        <p className="text-secondary col-md-8">
          Go shopping for merchandise, just go to dumb merch shopping. The biggest merchandise in <strong>Indonesia</strong>
        </p>
      </div>
      <div className=" mt-5">
        <Link to="/" className="btn btn-danger me-2 py-2 px-4" type="button">
          <strong>Login</strong>
        </Link>

        <Link to="/register" className="btn btn-dark py-2 px-3" type="button">
          <strong>Register</strong>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
