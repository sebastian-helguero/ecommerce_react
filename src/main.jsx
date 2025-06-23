import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './services/authContext/AuthContextProvider.jsx'
import ThemeContextProvider from './services/themeContext/ThemeContextProvider.jsx'
import CartContextProvider from './services/cartContext/CartContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <CartContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
