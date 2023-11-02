import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation in newer versions of React Router

  // Define static data
  const staticUsername = "abc";
  const staticPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === staticUsername && password === staticPassword) {
      navigate("/Home"); // Use navigate to go to the Home page
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">LOGIN</h3>
          <p>Admin Login</p>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#$">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
