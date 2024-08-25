import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import ProfileSkeleton from "@/components/profile/ProfileSkeleton"
import RecipeList from "@/components/recipePage/RecipeList"

const Collection = ({ loggedInUsername }) => {
  const { username, collectionId } = useParams()
  const navigate = useNavigate()

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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/collections/${collectionId}`
      )
      navigate(`/${loggedInUsername}/collections`, {
        state: { deleted: true },
      })
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred")
    }
  }

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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    Delete Collection
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Collection</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this collection?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button className="rounded-full" variant="outline">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      className="rounded-full"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
