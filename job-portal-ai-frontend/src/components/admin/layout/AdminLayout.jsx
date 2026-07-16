import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen]     = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <AdminSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
