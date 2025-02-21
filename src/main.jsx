import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import CreateAccount from "./CreateAccount.jsx";
import Login from "./Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
