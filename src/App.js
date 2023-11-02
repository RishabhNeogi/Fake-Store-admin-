import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./Tabs/Home";
import ItemDetails from "./Components/ItemDetails";
import Sidebar from "./Components/Sidebar";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Users from "./Components/Users";
import Cart from "./Components/Cart";
import Login from "./Tabs/Login";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Provider store={store}>
        <div>{useMatch("/") ? null : <Sidebar />}</div>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </div>
      </Provider>
    </div>
  );
}

export default App;
