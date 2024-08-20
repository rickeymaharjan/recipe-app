import { Button } from "@/components/ui/button"

import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div
      style={{ height: "calc(100vh - 75px)" }}
      className="w-full flex flex-col justify-center items-center bg-[#DE3725]"
    >
      <h1 className="text-white font-logo text-[200px] font-bold">404</h1>
      <p className="text-white font-bold font-avenir-black text-[60px] mt-[-40px]">
        Page Not Found.
      </p>
      <div className="flex gap-3 mt-[-10px]">
        <Button className="py-6 mt-10 rounded-full">
          <Link to="/">Go to Home Page</Link>
        </Button>
        <Button className="py-6 mt-10 rounded-full bg-white text-black hover:bg-white">
          Explore Recipes
        </Button>
      </div>
    </div>
  )
}

export default NotFound
