import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

const BaseLayout = () => {
  return (
    <div className="base-layout bg-gray-50">
      <Header />
      <div>
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
