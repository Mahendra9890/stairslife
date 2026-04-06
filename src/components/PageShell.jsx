import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'

export function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="app" />
      <main className="container-app py-10">{children}</main>
      <Footer />
    </div>
  )
}

