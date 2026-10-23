import Home from '@/components/Home'
import HubSpotPage from '@/components/HubSpotPage'

// two pages, so a pathname check is all the routing we need (vercel.json rewrites /hubspot to index.html)
const isHubSpot = window.location.pathname.replace(/\/+$/, '') === '/hubspot'

export default function App() {
  return isHubSpot ? <HubSpotPage /> : <Home />
}
