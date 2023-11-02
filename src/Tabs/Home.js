import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slices/productsSlice";
import NavbarComponent from "../Components/Navbar";
import ProductForm from "../Components/AddData";
import { setShowForm } from "../Redux/Slices/showFormSlice";
import { setCurrentPage } from "../Redux/Slices/currentPageSlice";

const Home = () => {
  const productsPerPage = 10;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const showForm = useSelector((state) => state.showForm);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: An error occurred while fetching products.</div>;
  }

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setCurrentPage(pageNumber));
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddDetailsClick = () => {
    dispatch(setShowForm(true));
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <NavbarComponent onAddDetailsClick={handleAddDetailsClick} />
        {showForm ? <ProductForm /> : null}
        <Row xs={1} md={3} className="g-4">
          {currentProducts.map((product, idx) => (
            <Col key={idx}>
              <Link to={`/item/${product.id}`}>
                <Card style={{ margin: "35px 15px", cursor: "pointer" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{
                      height: "300px",
                      width: "250px",
                      margin: "auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        webkitLineClamp: "1",
                        display: "-webkit-box",
                        webkitBoxOrient: "vertical",
                        fontWeight: "bold",
                        fontVariant: "all-small-caps",
                      }}
                    >
                      {product.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        webkitLineClamp: "2",
                        display: "-webkit-box",
                        webkitBoxOrient: "vertical",
                        textAlign: "center",
                      }}
                    >
                      {product.description}
                    </Card.Text>
                    <Card.Text style={{ textAlign: "center" }}>
                      <span style={{ fontWeight: "bold" }}>$</span>
                      <span style={{ fontWeight: "bold" }}>
                        {product.price}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div>
          <Pagination style={{ justifyContent: "center" }}>
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Home;
