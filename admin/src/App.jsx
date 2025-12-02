import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";

const App = () => {
  const url = "http://localhost:4000";
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      <ToastContainer />
      {!isLoginPage && (
        <>
          <Navbar />
          <hr />
        </>
      )}
      <div className={isLoginPage ? "" : "app-content"}>
        {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login url={url}/>} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
