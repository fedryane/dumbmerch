import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

const CategoryList = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const updateCategory = (id) => {
    navigate("/edit-category/" + id);
  };
  let { data: category, refetch } = useQuery("categoryCache", async () => {
    const response = await API.get("/categorys");
    return response.data.data.category;
    console.log(response.data.data.category);
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteData = () => {
    setConfirmDelete(true);
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

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
            <th className="text-center align-middle">Category Name</th>
            <th className="text-center align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center align-middle">{index + 1}</td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="text-center align-middle">
                  <Button
                    onClick={() => {
                      updateCategory(item.id);
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

export default CategoryList;
