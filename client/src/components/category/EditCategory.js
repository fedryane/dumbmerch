import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import {Col, Button} from "react-bootstrap"

function EditCategory() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });

  let { refetch } = useQuery("categoryCache", async () => {
    const response = await API.get("/category/" + id);
    console.log(response);
    setCategory({ name: response.data.data.category.name });
    console.log(response.data.data.category.name);
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch("/category/" + id, body, config);
      console.log(response);
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Col>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <input className="input mt-4" type="text" name="category" placeholder="Category Name" value={category.name} onChange={handleChange}></input>
        <div className="d-grid gap-2 mt-4">
          <Button type="submit" variant="success" size="md">
            Save
          </Button>
        </div>
      </form>
    </Col>
  );
}

export default EditCategory;
