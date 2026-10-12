import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// The site's two design fonts: Cormorant Garamond for elegant display headings and
// DM Sans for readable body copy, navigation, forms, and controls.
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/dm-sans/wght.css'

// These fonts remain loaded only so the protected /services pages keep their
// exact previous appearance — those routes freeze the old tokens (see
// tokens.css, `html[data-legacy-theme]`).
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'

import './styles/tokens.css'
import './styles/base.css'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from './router/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
)
