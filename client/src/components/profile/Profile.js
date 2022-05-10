import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "../assets/img/profile1.png";
import Navbar from "../components/Navbar";
import Logo from "../assets/img/icon/icon-dumb-merch.png";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const Profile = () => {
  const title = "Profile";
  document.title = "Dumbmers | " + title;

  const [transactions, setTransaction] = useState([]);

  const [state] = useContext(UserContext);

  const getTransactios = async () => {
    const response = await API.get("/transactions");
    setTransaction(response.data.data);
  };

  console.log(transactions);

  useEffect(() => {
    getTransactios();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Container className="mt-2">
          <Row className="text-sm-center text-lg-start">
            <Col className="col-sm-12 col-md-12 col-lg-4">
              <h5 className="text-var-red mb-4">My Profile</h5>
              <img src={Image} alt="Profile" />
            </Col>
            <Col className="col-sm-12 col-md-12 col-lg-3 mt-5">
              <div className="mb-3">
                <span className="text-var-red fw-bold">Name</span>
                <p>{state.user.name}</p>
              </div>
              <div className="mb-3">
                <span className="text-var-red fw-bold">Email</span>
                <p>{state.user.email}</p>
              </div>
              <div className="mb-3">
                <span className="text-var-red fw-bold">Phone</span>
                <p>+628237437847</p>
              </div>
              <div className="mb-3">
                <span className="text-var-red fw-bold">Gender</span>
                <p>Male</p>
              </div>
              <div className="mb-3">
                <span className="text-var-red fw-bold">Address</span>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
              </div>
            </Col>

            <Col className="col-sm-12 col-md-12 col-lg-5 mb-sm-5 mb-lg-0">
              <h5 className="text-var-red mb-4">My Transaction</h5>
              {transactions?.length > 0 ? (
                <>
                  <table className="bg-var-dark-gray d-flex rounded">
                    <tbody className="container-fluid">
                      {transactions?.map((item, index) => (
                        <tr className="d-flex justify-content-between align-items-center pt-2 pb-2">
                          <td className="d-flex ">
                            <img src={item.product.image} className="image-list-product pe-3" />
                            <div>
                              <span className="fw-bold text-var-red ">{item.product.name}</span>
                              <small className="text-var-red d-block mb-3">{item.createdAt} WIB</small>
                              <span className=" d-inline-block">Price: {item.product.price}</span>
                              <span className=" d-inline-block"> Status: {item.status}</span>
                            </div>
                          </td>
                          <td className="pe-3">
                            <img src={Logo} className="ms-auto" style={{ width: "70px" }} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="text-center">No Transactions</div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
