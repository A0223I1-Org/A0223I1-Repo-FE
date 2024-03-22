import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Auth0Provider} from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));

const Index = () => {
    return (
        <Auth0Provider
            domain="dev-t6vqzb5qdeusrk8n.us.auth0.com"
            clientId="zKBqWDkTWaVtTtYSRGwy8RjOg7q7XlXp"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <BrowserRouter>
                <App></App>
                <ToastContainer />
            </BrowserRouter>
        </Auth0Provider>
    );
};

root.render(<Index />);
reportWebVitals();
