import React, { useState } from "react";
import { Col,Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import Navbar from "../navbar/Navbar";

const AddProducts = () => {
  let navigate = useNavigate();

  // const [categories, setCategories] = useState([]); //Store all category data
  // const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching category data
  // const getCategories = async () => {
  //   try {
  //     const response = await API.get('/categories');
  //     setCategories(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // For handle if category selected
  // const handleChangeCategoryId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked) {
  //     // Save category id if checked
  //     setCategoryId([...categoryId, parseInt(id)]);
  //   } else {
  //     // Delete category id from variable if unchecked
  //     let newCategoryId = categoryId.filter((categoryIdItem) => {
  //       return categoryIdItem != id;
  //     });
  //     setCategoryId(newCategoryId);
  //   }
  // };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      // formData.set('categoryId', categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  // useEffect(() => {
  //   getCategories();
  // }, []);
  return (
    <Col>
    <Navbar/>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        {preview && (
          <div>
            <img
              src={preview}
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
              }}
              alt="preview"
            />
          </div>
        )}
        <input onChange={handleChange} type="file" id="upload" name="image" hidden />
        <label className="file" for="upload">
          Upload File
        </label>
        <input className="input mt-4" type="text" name="name" placeholder="Product Name" onChange={handleChange}></input>
        <textarea className="input mt-4" name="desc" placeholder="Product Descriptions" onChange={handleChange}></textarea>
        <input className="input mt-4" type="number" name="price" placeholder="Price" onChange={handleChange}></input>
        <input className="input mt-4" type="number" name="qty" placeholder="Stock" onChange={handleChange}></input>
        <div className="d-grid gap-2 mt-4">
          <Button type="submit" variant="success" size="md">
            Add
          </Button>
        </div>
      </form>
    </Col>
  );
};

export default AddProducts;
