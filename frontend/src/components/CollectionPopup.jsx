import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import { LuBookmark } from "react-icons/lu"

const CollectionPopup = () => {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/collections/user/${user._id}`
        )
        setCollections(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCollections()
  }, [user])

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[35px] h-[35px]">
          <LuBookmark
            className="p-[10px] rounded-full bg-black cursor-pointer"
            size={35}
            color="white"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your collections</DialogTitle>
          <DialogDescription>
            Select the collection you want to add this recipe to.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong. Try again later.</p>
        ) : (
          collections.map((collection) => (
            <div
              key={collection._id}
              className="flex items-center gap-3 border rounded-md p-3 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={
                  collection.recipes.length > 0
                    ? collection.recipes[0].imageFilename
                    : "https://t4.ftcdn.net/jpg/03/13/99/15/360_F_313991528_xkWq6AjZIkRu21XCF1jDqRFDx9v93M7r.jpg"
                }
                alt="collection-image"
                className="w-[100px] h-[70px] object-cover rounded-md"
              />

              <div className="flex flex-col">
                <Label className="text-base">{collection.name}</Label>
                <Label className="text-base text-gray-500">
                  {collection.recipes.length} recipes
                </Label>
              </div>
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CollectionPopup
