import React, {lazy, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import Error from './pages/Error';
import Home from './pages/Home';
import Products  from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Protected from './pages/Protected'
import ProductEdit from './pages/ProductEdit';
import Root from "./pages/Root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/protected",
        element: <Protected />
      },
      {
        path: "*",
        element: <Error />
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "products/:id/edit",
        element: <ProductEdit />,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
