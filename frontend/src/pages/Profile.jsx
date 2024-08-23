// ShadCN components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"

// router imports
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom"

// Custom components
import NotFound from "@/pages/NotFound"
import ProfileSkeleton from "@/components/profile/ProfileSkeleton"

function Profile({ loggedInUsername }) {
  const { username } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const isOwner = username === loggedInUsername

  const tabs = [
    { name: "Recipes", path: "" },
    { name: "Collections", path: "collections" },
    { name: "Meal Plannings", path: "meals" },
  ]

  if (isOwner) {
    tabs[0].name = "Your Recipes"
  }

  const isActiveTab = (tabPath) => {
    return (
      location.pathname === `/${username}/${tabPath}` ||
      (tabPath === "" && location.pathname === `/${username}`)
    )
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/username/${username}`
        )
        setUserData(response.data)
      } catch (err) {
        setError(err.response.data.error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  if (loading) return <ProfileSkeleton />
  if (error) return <NotFound />

  return (
    <div className="common-padding" style={{ minHeight: "calc(100vh - 75px)" }}>
      {/* Top section */}
      <div className="flex items-center gap-5 mt-12 mb-12">
        <Avatar className="w-28 h-28 lg:w-32 lg:h-32">
          {userData.profileImage && <AvatarImage src={userData.profileImage} />}
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-[10px]">
          <p className="text-2xl lg:text-3xl font-avenir-heavy">
            {userData.username}
          </p>
          <p className="text-gray-500 text-sm lg:text-base">Austria</p>
          {isOwner && (
            <Button className="rounded-full w-[110px]">Edit Profile</Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 text-gray-400 mb-5">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`font-avenir-heavy text-sm cursor-pointer ${
              isActiveTab(tab.path) ? "text-black" : ""
            }`}
            onClick={() => navigate(`${tab.path}`)}
          >
            {tab.name}
          </span>
        ))}
      </div>

      <hr className="mb-5" />

      <Outlet context={{ userData, isOwner }} />
    </div>
  )
}

export default Profile
