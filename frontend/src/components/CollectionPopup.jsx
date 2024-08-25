import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import { LuBookmark } from "react-icons/lu"
import { useParams } from "react-router-dom"

const CollectionPopup = () => {
  const { recipeId } = useParams()

  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [open, setOpen] = useState(false)

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

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = async (collectionId) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/collections/${collectionId}/add-recipe`,
        { recipeId }
      )

      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection._id === collectionId
            ? {
                ...collection,
                recipes: [...collection.recipes, { _id: recipeId }],
              }
            : collection
        )
      )

      toast.success("Recipe added to collection")
    } catch (error) {
      toast.error("Something went wrong. Try again later.")
    }
    setOpen(false)
  }

  const handleRemove = async (collectionId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/collections/${collectionId}/remove-recipe/${recipeId}`
      )

      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection._id === collectionId
            ? {
                ...collection,
                recipes: collection.recipes.filter(
                  (recipe) => recipe._id !== recipeId
                ),
              }
            : collection
        )
      )

      toast.success("Recipe removed from collection")
    } catch (error) {
      toast.error("Something went wrong. Try again later.")
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
        />

        {isLoading ? (
          <Label>Loading...</Label>
        ) : error ? (
          <Label>Something went wrong. Try again later.</Label>
        ) : filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <div
              key={collection._id}
              className="flex items-center justify-between border rounded-md p-3 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-3 items-center">
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
              {collection.recipes.some((recipe) => recipe._id === recipeId) ? (
                <Button
                  variant="outline"
                  className="font-avenir-medium rounded-full"
                  onClick={() => handleRemove(collection._id)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="font-avenir-medium rounded-full"
                  onClick={() => handleAdd(collection._id)}
                >
                  Add
                </Button>
              )}
            </div>
          ))
        ) : (
          <Label>No collections found.</Label>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CollectionPopup
