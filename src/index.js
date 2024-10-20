import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Features from './Features';
import Signup from './Signup';
import Signin from './Signin';
import Usage from './Usage';
import App from './App';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/features",
    element: <Features />
  },
  {
    path: "/usage",
    element: <Usage />
  },
  {
    path: "/app",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
