import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EditData = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string()
      .url("Invalid URL format")
      .required("Image Link is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      const productId = window.location.pathname.split("/")[2];
      try {
        const response = await axios.patch(
          `https://fakestoreapi.com/products/${productId}`, // Use template literals to include the product ID in the URL
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Data updated successfully.");
          toast.success("Record Updated successfully!");
        } else {
          console.error(
            "Failed to update data. Status code: " + response.status
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while updating data: " + error.message
        );
      }
      formik.resetForm();
    },
  });

  return (
    <div style={{ padding: "25px" }}>
      <h3>Update Your Entry :</h3>
      <form onSubmit={formik.handleSubmit}>
        <Col>
          <Row>
            <input
              type="text"
              placeholder="title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="error">{formik.errors.title}</p>
            )}

            <input
              type="number"
              placeholder="price"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="error">{formik.errors.price}</p>
            )}
          </Row>
          <Row>
            <input
              type="text"
              placeholder="description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="error">{formik.errors.description}</p>
            )}

            <input
              type="text"
              placeholder="category"
              {...formik.getFieldProps("category")}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="error">{formik.errors.category}</p>
            )}
          </Row>
          <Row>
            <input
              type="text"
              placeholder="Image-Link"
              {...formik.getFieldProps("image")}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="error">{formik.errors.image}</p>
            )}
          </Row>
        </Col>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EditData;
