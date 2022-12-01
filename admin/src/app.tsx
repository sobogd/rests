import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App: React.FC = () => {
  const token = sessionStorage.getItem("token");

  React.useEffect(() => {
    if (!token && window.location.pathname !== "/authorization") {
      window.location.href = "/authorization";
    }
  }, [token]);

  return <RouterProvider router={router} />;
};

export default App;
