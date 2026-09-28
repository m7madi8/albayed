import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
/* IBM Plex Sans — Latin (SKU, أرقام، نصوص LTR) */
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
/* IBM Plex Sans Arabic — احتياطي عند غياب Monadi.ttf */
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css'
import './styles/fonts-monadi.css'
import './index.css'
import App from './App'
import { VisitOrderProvider } from './context/VisitOrderContext'
import { ThemeProvider } from './context/ThemeContext'
import { CatalogEngagementProvider } from './context/CatalogEngagementContext'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <VisitOrderProvider>
          <CatalogEngagementProvider>
            <App />
          </CatalogEngagementProvider>
        </VisitOrderProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
