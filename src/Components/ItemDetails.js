import React, { useEffect, useState } from "react";
import "../Style/item.css";
import axios from "axios";
import { toast } from "react-toastify";
import EditData from "./Form";

const ItemDetails = () => {
  const [records, setRecords] = useState([]);

  const itemId = window.location.pathname.split("/")[2];
  console.log(itemId);
  const [itemDetails, setItemDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${itemId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleDelete = (itemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmed) {
      axios
        .delete(`https://fakestoreapi.com/products/${itemId}`)
        .then((response) => {
          if (response.status === 200) {
            // Successful deletion, update the records
            const updatedRecords = records.filter(
              (record) => record.id !== itemId
            );
            setRecords(updatedRecords);
            toast.success("Record deleted successfully!");
            console.log("Record deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
        });
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddToCart = () => {
    // Add the selected item to the cartItems state
    if (itemDetails) {
      setCartItems([...cartItems, itemDetails]);
      toast.success("Item added to the cart!");
    }
  };

  if (editMode) {
    return (
      <div>
        <EditData itemDetails={itemDetails} />
        <button onClick={toggleEditMode}>Cancel</button>
      </div>
    );
  } else if (itemDetails) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            paddingTop: "25px",
          }}
        >
          <button
            onClick={toggleEditMode}
            style={{
              backgroundColor: "#49cc90",
              color: "white",
              border: "none",
              width: "80px",
              height: "30px",
              borderRadius: "10px",
            }}
          >
            EDIT
          </button>
          <button
            onClick={() => handleDelete(itemDetails.id)}
            style={{
              backgroundColor: "#f93e3e",
              color: "white",
              border: "none",
              width: "80px",
              height: "30px",
              borderRadius: "10px",
            }}
          >
            DELETE
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "100vh",
            overflowX: "hidden",
            margin: "15px",
          }}
        ></div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "100vh",
            overflowX: "hidden",
            margin: "15px",
          }}
        >
          <div>
            <section className="py-5">
              <div className="container">
                <div className="row gx-5">
                  <aside className="col-lg-6">
                    <div className="border rounded-4 mb-3 d-flex justify-content-center">
                      <a
                        data-fslightbox="mygalley"
                        className="rounded-4"
                        target="_blank"
                        data-type="image"
                        href="#$itemDetails.image"
                      >
                        <img
                          style={{
                            maxWidth: "90%",
                            maxHeight: "65vh",
                            margin: "auto",
                          }}
                          className="rounded-4 fit"
                          src={itemDetails.image}
                          alt={itemDetails.title}
                        />
                      </a>
                    </div>
                  </aside>
                  <main className="col-lg-6">
                    <div className="ps-lg-3">
                      <h4 className="title text-dark">{itemDetails.title}</h4>

                      <div className="mb-3">
                        <span className="h5">$</span>
                        <span className="h5">{itemDetails.price}</span>
                      </div>

                      <p>{itemDetails.description}</p>

                      <div className="row">
                        <dt className="col-3">Category:</dt>
                        <dd className="col-9">{itemDetails.category}</dd>
                      </div>

                      <hr />

                      <a
                        className="btn btn-primary shadow-0"
                        onClick={handleAddToCart}
                      >
                        <i className="me-1 fa fa-shopping-basket"></i> Add to
                        cart
                      </a>
                    </div>
                  </main>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemDetails;
