import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AddData = () => {
  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    website: Yup.string().required("Website is required"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      email: "",
      username: "",
      password: "",
      name: "",
      phone: "",
      website: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://fakestoreapi.com/users", {
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
    <div style={{ padding: "25px" }}>
      <h1>Add User</h1>
      <form onSubmit={formik.handleSubmit}>
        <Col>
          <Row>
            <Col>
              <label htmlFor="name">Name</label>
            </Col>
            <Col>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="username">Username</label>
            </Col>
            <Col>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="email">Email</label>
            </Col>
            <Col>
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="address">Address</label>
            </Col>
            <Col>
              <input
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="phone">Phone</label>
            </Col>
            <Col>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="website">Website</label>
            </Col>
            <Col>
              <input
                type="text"
                id="website"
                name="website"
                onChange={formik.handleChange}
                value={formik.values.website}
              />
              {formik.errors.website ? (
                <div>{formik.errors.website}</div>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="password">Password</label>
            </Col>
            <Col>
              <input
                type="text"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Col>
          </Row>
        </Col>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddData;
