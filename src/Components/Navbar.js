import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

function NavbarComponent({
  onAddDetailsClick,
  searchText,
  setSearchText,
  onSort,
  records,
}) {
  const [isAscending, setIsAscending] = React.useState(true); // Step 1: Create state for sorting
  const toggleSort = () => {
    const sortedRecords = [...records].sort((a, b) => {
      const sortOrder = isAscending ? 1 : -1;
      return sortOrder * (a.id - b.id); // Change this to sort by the 'id' field
    });
    setIsAscending(!isAscending);
    onSort(sortedRecords);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Button onClick={onAddDetailsClick}>ADD DETAILS</Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={toggleSort} href="#action1">
              Sort-Data
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
