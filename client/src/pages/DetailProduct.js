import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Rupiah from "rupiah-format";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useParams, useNavigate } from "react-router-dom";

// import API
import { API } from "../config/api";

// import useQuery
import { useQuery, useMutation } from "react-query";

function DetailProduct() {
  let { id } = useParams();
  let navigate = useNavigate();
  console.log(id);

  // const [product, setProduct] = useState([]);

  // Fetching product detail from database
  // let { data: product, refetch } = useQuery("productCache", async () => {
  //   let response = await API.get("/product/" + id);
  //   console.log(response.data.data);
  //   return response.data.data.products;
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await API.get(`/product/${id}`);
  //     setProduct(response.data.data.products);
  //   };
  //   fetchData();
  // }, []);

  // Fetching product data from database
  let { data: product, refetch } = useQuery("productCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/product/" + id, config);
    return response.data.data.products;
  });

  // Create config Snap payment page with useEffect here ...
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client--5l9_4MVdsoXpIQz";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async () => {
    try {
      // Get data from product

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      // Data body
      const body = JSON.stringify(data);
      console.log(body);
      // Configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", body, config);
      console.log("ini response", response.data.payment.token);
      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      // Init Snap for display payment page with token here ...
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md="2"></Col>
          <Col md="3" className="mx-5">
            <img src={product?.image} className="img-fluid" />
          </Col>
          <Col md="5">
            <h1 className="text-header-product-detail text-danger">{product?.name}</h1>
            <div className="text-content-product-detail text-white">Stock : {product?.qty}</div>
            <p className="text-content-product-detail mt-4 text-white">{product?.desc}</p>
            <h3 className="text-price-product-detail text-end mt-4 fw-bolder text-danger">{Rupiah.convert(product?.price)}</h3>
            <div className="d-grid gap-2 mt-5">
              <Button onClick={handleBuy} className="btn btn-danger">
                Buy
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailProduct;
