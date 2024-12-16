import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/welcome/Home';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Features from './pages/welcome/Features';
import Signup from './pages/welcome/Signup';
import Login from './pages/welcome/Login';
import Usage from './pages/welcome/Usage';
import App from './pages/welcome/App';
import Dashboard from './pages/dashboard/Dashboard';
import {AuthProvider} from "./contexts/AuthContext";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import CalendarView from "./pages/dashboard/CalendarView";
import Overview from "./pages/dashboard/Overview";
import Analytics from "./pages/dashboard/Analytics";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
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
        path: "/login",
        element: <Login/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/calendar",
        element: <CalendarView/>
    },
    {
        path: "/overview",
        element: <Overview/>
    },
    {
        path: "/analytics",
        element: <Analytics/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
    {
        path: "/settings",
        element: <Settings/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <RouterProvider router={router}/>
            </DevSupport>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
