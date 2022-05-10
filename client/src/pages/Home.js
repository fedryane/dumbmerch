import React, { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar";
// import { Data } from "../../components/Card/data";
import { Col, Container, Row, Button } from "react-bootstrap";
import Cards from "../components/cards/Cards";

import "./VarCSS.css";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

const Home = () => {
  const [state] = useContext(UserContext);
  const [listCard, setListCard] = useState(1);
  const loadMore = async () => {
    await setListCard(listCard + listCard);
  };

  console.log(state);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data.product.slice(0, listCard);
  });
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4 mb-4 headline">Products</h2>
          </Col>
        </Row>
        <Row lg={5}>
          {products?.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
        </Row>
        <Button onClick={() => loadMore()} variant="dark" className="w-100">
          {" "}
          View more..
        </Button>
      </Container>
    </div>
  );
};

export default Home;
