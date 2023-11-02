import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import AddUser from "./AddUser";

const Users = () => {
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState(""); // Step 1: Create state for search text

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      setRecords(response.data);
      setColumns(Object.keys(response.data[0]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddDetailsClick = () => {
    setShowForm(true);
  };

  // Step 3: Filter the records based on search text
  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <Navbar
          onAddDetailsClick={handleAddDetailsClick}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {showForm ? <AddUser /> : null}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "100vh",
            overflowX: "hidden",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((head) => (
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      textAlign: "left",
                      backgroundColor: "#3c4b64",
                      color: "white",
                    }}
                    key={head}
                  >
                    {head}
                  </th>
                ))}
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    textAlign: "left",
                    backgroundColor: "#3c4b64",
                    color: "white",
                  }}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((head, columnIndex) => (
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        backgroundColor: "white",
                      }}
                      key={columnIndex}
                    >
                      {head === "id" ? (
                        <Link to={`/user/${row[head]}`}>{row[head]}</Link>
                      ) : head === "address" ? (
                        `${row[head].city}, ${row[head].street}, ${row[head].zipcode}`
                      ) : head === "name" ? (
                        `${row[head].firstname} ${row[head].lastname}`
                      ) : (
                        row[head]
                      )}
                    </td>
                  ))}
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "white",
                    }}
                  >
                    <Link to={`/user/${row.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
