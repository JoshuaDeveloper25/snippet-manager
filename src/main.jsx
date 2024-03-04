// MUST-HAVE Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppProvider";

// Styles imports
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages imports
import Root from "./pages/Root";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AllSnippets from "./pages/AllSnippets";
import AddSnippet from "./pages/AddSnippet";
import EditSnippet from "./pages/EditSnippet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/all-snippets",
        element: <AllSnippets />,
      },

      {
        path: "/add-snippet",
        element: <AddSnippet />,
      },

      {
        path: "/edit-snippet/:snippedId",
        element: <EditSnippet />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer stacked />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  </>
);
