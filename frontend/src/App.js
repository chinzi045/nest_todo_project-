import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthMiddleware from "./components/AuthMiddleware";
import { ContextProvider } from "./components/Context";
import Active from "./pages/Active";
import Completed from "./pages/Completed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import AdminMiddleware from "./components/AdminMiddleware";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={3000}
        position={"top-center"}
        hideProgressBar={true}
      />
      <ContextProvider>
        <Routes>
          <Route element={<AuthMiddleware />}>
            <Route element={<Active />} path="/" />
            <Route element={<Completed />} path="/complete" />
            <Route element={<AdminMiddleware />}>
              <Route element={<Users />} path="/users" />
            </Route>
          </Route>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
