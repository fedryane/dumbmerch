import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { Data } from "../cards/dummy";

const ProductList = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  let { data: product, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data.product;
  });

  const updateProduct = (id) => {
    navigate("/edit-product/" + id);
    console.log(id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteData = () => {
    setConfirmDelete(true);
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);
  return (
    <Col>
      <Table striped bordered hover variant="dark" responsive="xs">
        <thead>
          <tr>
            <th className="text-center align-middle">No</th>
            <th className="text-center align-middle">Photo</th>
            <th className="text-center align-middle">Product Name</th>
            <th className="text-center align-middle">Product Desc</th>
            <th className="text-center align-middle">Price</th>
            <th className="text-center align-middle">Qty</th>
            <th className="text-center align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {product?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center align-middle">{index + 1}</td>
                <td className="text-center align-middle">
                  <img className="img" width={100} height={100} src={item.image} />
                </td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="text-center align-middle">{item.desc.slice(0, 20)}...</td>
                <td className="text-center align-middle">{item.price}</td>
                <td className="text-center align-middle">{item.qty}</td>
                <td className="text-center align-middle">
                  <Button
                    onClick={() => {
                      updateProduct(item.id);
                    }}
                    variant="success"
                    className="me-2 px-4"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    variant="danger"
                    className="px-3"
                  >
                    Delete
                  </Button>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body className="text-dark">
                      <div style={{ fontSize: "20px", fontWeight: "900" }}>Delete Data</div>
                      <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
                        Are you sure you want to delete this data?
                      </div>
                      <div className="text-end mt-5">
                        <Button onClick={deleteData} size="sm" className="btn-success me-2" style={{ width: "135px" }}>
                          Yes
                        </Button>
                        <Button onClick={handleClose} size="sm" className="btn-danger" style={{ width: "135px" }}>
                          No
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
};

export default ProductList;
