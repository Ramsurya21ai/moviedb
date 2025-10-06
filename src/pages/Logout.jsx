import React from "react";
import "./logout.css"

const LogoutButton = ({ setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("👋 Logged out successfully!");
  };

  return (
    <button className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
