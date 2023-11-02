import React, { useEffect, useState } from "react";
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
  const [sortBy, setSortBy] = useState("title"); // Step 1: Create state for sorting
  const [isAscending, setIsAscending] = useState(true); // Step 1: Create state for sorting

  const [searchText, setSearchText] = useState(""); // Step 1: Create state for search text

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(field);
      setIsAscending(true);
    }
  };

  // Step 3: Sort the products based on the selected field and order

  const sortedProducts = [...products].sort((a, b) => {
    const sortOrder = isAscending ? 1 : -1;
    return sortOrder * (a[sortBy] < b[sortBy] ? -1 : 1);
  });
  products = sortedProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddDetailsClick = () => {
    dispatch(setShowForm(true));
  };

  // Step 3: Filter the current products based on search text
  const filteredProducts = currentProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <NavbarComponent
          onAddDetailsClick={handleAddDetailsClick}
          searchText={searchText} // Pass searchText and setSearchText to NavbarComponent
          setSearchText={setSearchText}
          onSort={handleSort}
          records={products}
        />
        {showForm ? <ProductForm /> : null}

        <Row xs={1} md={3} className="g-4">
          {filteredProducts.map((product, idx) => (
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
