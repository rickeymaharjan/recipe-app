// ShadCN
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

import { useSelector } from "react-redux"
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import AccountSkeleton from "@/components/profile/AccountSkeleton"

const Account = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.user._id)

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch to get the latest user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
        )
        const data = await response.json()
        setUser(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  const tabs = [
    { name: "General", path: "" },
    { name: "Profile", path: "profile" },
    { name: "Password", path: "password" },
  ]

  const isActive = (tabPath) => {
    return (
      location.pathname == `/account/${tabPath}` ||
      (tabPath == "" && location.pathname == "/account")
    )
  }

  const getActiveTabName = () => {
    const activeTab = tabs.find((tab) => isActive(tab.path))
    return activeTab ? activeTab.name : ""
  }

  if (loading) return <AccountSkeleton />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-[100vh] px-64 py-24">
      {/* Profile */}
      <div className="flex gap-4 items-start mb-16">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.profileImage} alt={user?.username} />
          <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex gap-1 flex-col">
          <h2 className="text-2xl font-avenir-medium">
            {user.username} <span className="text-gray-200">/</span>{" "}
            {getActiveTabName()}
          </h2>
          <Label className="text-gray-500">Update your account here</Label>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col text-gray-500 gap-2 w-[200px]">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`font-avenir-medium hover:text-black cursor-pointer ${
                isActive(tab.path) ? "text-black font-bold" : ""
              }`}
              onClick={() => navigate(`${tab.path}`)}
            >
              {tab.name}
            </span>
          ))}

          <div className="border w-full my-3"></div>

          <Dialog>
            <DialogTrigger asChild>
              <span className="text-red-500 cursor-pointer">
                Delete account
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Account deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account?
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="rounded-full" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="destructive" className="rounded-full">
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Outlet context={{ user, setUser }} />
      </div>
    </div>
  )
}

export default Account
