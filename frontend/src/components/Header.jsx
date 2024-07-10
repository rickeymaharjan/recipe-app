import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"

import { IoSearchOutline } from "react-icons/io5"

function Header() {
  return (
    <div className="w-full h-[85px] flex justify-between items-center px-[80px]">
      <div className="flex gap-7">
        <p className="font-avenir-medium">Explore recipes</p>
        <p className="font-avenir-medium">Favourite</p>
        <p className="font-avenir-medium">Meal plans</p>
      </div>

      <Link
        to="/"
        className="text-3xl text-black transition ease-in-out font-logo hover:text-[#DE3725] hover:scale-105"
      >
        Fresh Feast
      </Link>

      <div className="flex items-center gap-3">
        <div className="relative w-[225px] h-[35px]">
          <Input
            className="w-full h-full pl-10 rounded-full "
            placeholder="search"
          />
          <div className="absolute inset-y-0 flex items-center bg-transparent left-4">
            <IoSearchOutline />
          </div>
        </div>

        <div className="flex gap-1">
          <Link to="/login">
            <Button className="text-black bg-transparent rounded-full hover:bg-transparent">
              Log in
            </Button>
          </Link>

          <Button className="rounded-full">Sign up</Button>
        </div>
      </div>
    </div>
  )
}

export default Header
