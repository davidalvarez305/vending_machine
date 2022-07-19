import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import UserProvider from "./context/UserContext";
import { Dictionary } from "./screens/Dictionary";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { SynonymsList } from "./screens/SynonymsList";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/word/:word" element={<SynonymsList />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
