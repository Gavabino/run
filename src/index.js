import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Features from './pages/Features';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Usage from './pages/Usage';
import App from './pages/App';
import HomeScreen from './pages/HomeScreen';
import {AuthProvider} from "./contexts/AuthContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/features",
        element: <Features/>
    },
    {
        path: "/usage",
        element: <Usage/>
    },
    {
        path: "/app",
        element: <App/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/signin",
        element: <Signin/>
    },
    {
        path: "/homescreen",
        element: <HomeScreen/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
