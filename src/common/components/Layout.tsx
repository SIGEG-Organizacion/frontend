import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 flex items-center justify-center bg-gray-50">
      <Outlet />
    </main>
  </div>
)

export default Layout