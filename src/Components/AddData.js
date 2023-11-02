import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AddData = () => {
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
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Data was successfully added
          console.log("Data added successfully:", values);

          // Show a success toast
          toast.success("Data added successfully!", {
            autoClose: 3000, // Auto close after 3 seconds
          });

          // Reset the form
          formik.resetForm();
        } else {
          // Handle the case where the API call was not successful
          console.error("Failed to add data. Status code: " + response.status);
          toast.error("Failed to add data. Please try again.");
        }
      } catch (error) {
        // Handle any network or other errors
        console.error("An error occurred while adding data: " + error.message);
        toast.error("An error occurred while adding data. Please try again.");
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Add your entry :</h4>
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

export default AddData;
