import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CreateContact from './pages/CreateContact.jsx'
import GetContacts from "./pages/GetContacts.jsx";
import UpdateContact from "./pages/UpdateContact.jsx";
import DeleteContact from "./pages/DeleteContact.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="contact/create" element={<CreateContact />} />
      <Route path="contact/get" element={<GetContacts />} />
      <Route path="contact/update" element={<UpdateContact />} />
      <Route path="contact/delete" element={<DeleteContact />} />
    </Routes>
  </BrowserRouter>,
);