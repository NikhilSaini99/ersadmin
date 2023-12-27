import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Spinner from './components/Spinner'
import "./index.css";
import { AuthProvider } from "./hooks/useContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Router>
        <AuthProvider><App /></AuthProvider>
      </Router>
    </Suspense>
  </React.StrictMode>
);
