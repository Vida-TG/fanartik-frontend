import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Store';

const colors = {
  brand: {
    500: '#191319'
  }
}

const root = createRoot(document.getElementById('root'));
const theme = extendTheme({ colors })

root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <ChakraProvider>
          <PayPalScriptProvider deferLoading={true}>
            <ColorModeScript theme={theme} />
            <App />
          </PayPalScriptProvider>
        </ChakraProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
