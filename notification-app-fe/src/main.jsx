import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

// Shim: addresses MUI useAutocomplete ESM optimization issues during dependency optimization.
import './vite-env-fix-mui-autocomplete'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

