import React from "react";

const DashContent = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "95%",
          background: "white",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          width: "95%",
          background: "white",
          borderBottom: "1px solid #ccc",
          padding: "0.75rem 1.25rem",
        }}
      >
        You are Logged in !
      </div>
    </div>
  );
};

export default DashContent;
