import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { theme } from "./theme"
import './index.css'
 import { ThemeProvider } from '@emotion/react';
 import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter  >
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLient_ID}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
