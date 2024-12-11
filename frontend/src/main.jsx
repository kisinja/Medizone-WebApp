import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AppContextProvider>
  </BrowserRouter>,
);