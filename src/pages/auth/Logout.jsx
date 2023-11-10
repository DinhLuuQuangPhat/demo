import React from "react";
import { useEffect } from "react";
const Logout = () => {
  const clearData = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("locations");
    localStorage.removeItem("menuData");
  };
  useEffect(() => {
    clearData();
    window.location.href = "/auth/sign-in";
  }, []);

  return <div>Logout</div>;
};

export default Logout;
