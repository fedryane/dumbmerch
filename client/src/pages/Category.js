import React from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import CategoryList from "../components/category/CategoryList";

const Category = () => {
  let navigate = useNavigate();
  const addCategory = () => {
    navigate("/add-category");
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Row responsive="xs">
          <Stack direction="horizontal">
            <div>
              <h2 className="mt-4 mb-4 headline col">Category</h2>
            </div>
            <div className="ms-auto mt-4 mb-4">
              <Button onClick={addCategory} variant="dark" className="px-4 py-2">
                Add
              </Button>
            </div>
          </Stack>
        </Row>
        <Row>
          <CategoryList />
        </Row>
      </Container>
    </div>
  );
};

export default Category;
