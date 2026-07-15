import { Outlet } from "react-router-dom"
import UserNavbar from "./UserNavbar"
import Footer from "./Footer"

/**
 * UserLayout Component
 * Standard layout wrapper for authenticated candidate pages. Renders the UserNavbar,
 * main viewport slot (using React Router's Outlet), and the Footer.
 */
export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <UserNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
