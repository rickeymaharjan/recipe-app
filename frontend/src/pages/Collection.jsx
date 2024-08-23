import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import ProfileSkeleton from "@/components/profile/ProfileSkeleton"
import RecipeList from "@/components/recipePage/RecipeList"

const Collection = ({ loggedInUsername }) => {
  const { username, collectionId } = useParams()

  const [userData, setUserData] = useState(null)
  const [collectionData, setCollectionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isOwner = username === loggedInUsername

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/username/${username}`
        )
        setUserData(response.data)
      } catch (error) {
        setError(error.response.data.error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  // Fetch collection data
  useEffect(() => {
    const fetchCollectionData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/collections/recipes/${collectionId}`
        )
        setCollectionData(response.data)
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCollectionData()
  }, [collectionId])

  if (loading || !userData || !collectionData) return <ProfileSkeleton />
  if (error) return <p>Error</p>

  return (
    <div className="flex flex-col min-h-[100vh] common-padding py-20">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-5xl font-avenir-heavy">{collectionData.name}</h1>
        <Label className="text-base text-gray-500">
          {collectionData.recipes.length} recipes
        </Label>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="w-8 h-8">
              {userData.profileImage && (
                <AvatarImage src={userData.profileImage} />
              )}
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>

            <Label className="text-base">{userData.username}</Label>
          </div>

          {isOwner && (
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full">
                Edit Collection
              </Button>
              <Button variant="outline" className="rounded-full">
                Delete Collection
              </Button>
            </div>
          )}
        </div>
      </div>

      {!collectionData.recipes.length && <Label>No reicpes yet</Label>}

      {collectionData && <RecipeList recipes={collectionData.recipes} />}
    </div>
  )
}

export default Collection
