// Componenents from ShadCN
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

// Icons
import { IoSearchOutline } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import { IoLogInOutline } from "react-icons/io5"
import { IoPersonOutline } from "react-icons/io5"

// Redux
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice"

import { useNavigate } from "react-router-dom"

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

      <Link
        to="/"
        className="text-2xl lg:text-3xl text-black transition ease-in-out font-logo hover:text-[#DE3725] hover:scale-105"
      >
        Fresh Feast
      </Link>

      <div className="flex items-center gap-1">
        <div className="relative w-[225px] h-[35px]">
          <Input
            className="w-full h-full pl-10 rounded-full "
            placeholder="search"
          />
          <div className="absolute inset-y-0 flex items-center bg-transparent left-4">
            <IoSearchOutline />
          </div>
        </div>
        <div className="flex items-center gap-2"></div>

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
                {user.profileImage && (
                  <AvatarImage
                    className="rounded-full"
                    src={user.profileImage}
                  />
                )}
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
