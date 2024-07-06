import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"

const BaseLayout = () => {
  return (
    <div className="base-layout">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
