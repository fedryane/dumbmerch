import React from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ProductList from "../components/product/ProductList";
import "./VarCSS.css";
const Products = () => {
  const navigate = useNavigate();
  const AddProduct = () => {
    navigate("/add-product");
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Row responsive="xs">
          <Stack direction="horizontal">
            <div>
              <h2 className="mt-4 mb-4 headline col">Product List</h2>
            </div>
            <div className="ms-auto mt-4 mb-4">
              <Button variant="dark" className="px-4 py-2" onClick={AddProduct}>
                Add
              </Button>
            </div>
          </Stack>
        </Row>
        <Row>
          <ProductList />
        </Row>
      </Container>
    </div>
  );
};

export default Products;
