import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Link, useNavigate } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Icons
import { IoSearchOutline } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import { IoLogInOutline } from "react-icons/io5"
import { IoPersonOutline } from "react-icons/io5"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/authSlice"

function Header() {
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(logout())
  }

  const handleProfileClick = () => {
    navigate(`/${user.username}`)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = e.target.elements.search.value.trim()
    if (query) {
      const formattedQuery = query.replace(/\s+/g, "-")
      window.location.assign(`/search/${formattedQuery}`)
    }
  }

  return (
    <div className="w-full h-[75px] drop-shadow-sm flex justify-between items-center common-padding bg-white">
      <div className="lg:flex gap-7 hidden">
        <Link to="/recipes">
          <p className="font-avenir-medium font-bold text-gray-500 hover:text-black cursor-pointer">
            Explore recipes
          </p>
        </Link>
        <p className="font-avenir-medium font-bold text-gray-500 hover:text-black cursor-pointer">
          Favourite
        </p>
        <p className="font-avenir-medium font-bold text-gray-500 hover:text-black cursor-pointer">
          Meal plans
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <HiOutlineMenuAlt1 className="lg:hidden cursor-pointer" size={23} />
        <Link
          to="/"
          className="text-2xl lg:text-3xl text-black transition ease-in-out font-logo hover:text-[#DE3725] hover:scale-105"
        >
          Fresh Feast
        </Link>
      </div>

      <div className="flex items-center gap-3 lg:gap-2">
        <div className="relative w-[225px] h-[35px] hidden lg:flex">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <Input
              name="search"
              className="w-full h-full pl-10 rounded-full"
              placeholder="search"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 flex items-center bg-transparent left-4">
              <IoSearchOutline />
            </div>
          </form>
        </div>

        <IoSearchOutline size={23} className="lg:hidden" />

        {!isAuthenticated ? (
          <div className="flex gap-1">
            <Link to="/login">
              <Button className="text-black bg-transparent rounded-full hover:bg-transparent">
                Log in
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="rounded-full">Sign up</Button>
            </Link>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="border w-8 h-8 rounded-full">
              <Avatar className="w-full h-full">
                {user.profileImage && <AvatarImage src={user.profileImage} />}
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex gap-12">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-7 h-7">
                      {user.profileImage && (
                        <AvatarImage
                          className="rounded-full"
                          src={user.profileImage}
                        />
                      )}
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-avenir-medium">{user.username}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="w-1 h-1"></div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 items-center"
                onClick={handleProfileClick}
              >
                <IoPersonOutline />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 items-center">
                <IoSettingsOutline />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 items-center"
                onClick={handleLogoutClick}
              >
                <IoLogInOutline />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Header
