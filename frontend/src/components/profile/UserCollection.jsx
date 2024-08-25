// ShadCN components
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { toast } from "sonner"

// React
import { useOutletContext, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

// Custom components
import CardSkeleton from "../CardSkeleton"
import EmptyMessage from "../recipePage/EmptyMessage"

import axios from "axios"
import CollectionList from "./CollectionList"

const UserCollection = () => {
  const { userData, isOwner } = useOutletContext()
  const token = useSelector((state) => state.auth.token)
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const toastShownRef = useRef(false)

  // Show toast when collection is deleted
  useEffect(() => {
    if (location.state?.deleted && !toastShownRef.current) {
      toast.success("Collection deleted successfully.")
      toastShownRef.current = true
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])

  // Fetch user collections
  useEffect(() => {
    const fetchUserCollections = async () => {
      if (userData && userData._id) {
        setLoading(true)
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/collections/user/${
              userData._id
            }`
          )
          setCollections(response.data)
        } catch (error) {
          setError(error.response.data.error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserCollections()
  }, [userData])

  // Handle click on create collection button
  const handleClick = async () => {
    if (input && token) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/collections`,
          { name: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setCollections((prev) => [...prev, response.data])
        setInput("")
        setOpen(false)

        toast.success("Collection created successfully.")
      } catch (error) {
        setError(error.response.data.error)
      }
    }
  }

  if (loading) return <CardSkeleton amount={4} />

  if (error) return <EmptyMessage message="No collections yet." />

  return (
    <div>
      {collections.length === 0 && (
        <EmptyMessage message="No collections yet." />
      )}
      <CollectionList collections={collections} />
      {isOwner && (
        <div className="flex justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="rounded-full my-10 cursor-pointer">
                <Button className="rounded-full">Create a Collection</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Name your collection.</DialogTitle>
                <DialogDescription>
                  Please enter a name for your new collection.
                </DialogDescription>
              </DialogHeader>
              <Input
                onChange={(e) => setInput(e.target.value)}
                placeholder="Collection name"
              />
              <DialogFooter>
                <Button
                  className="rounded-full"
                  onClick={handleClick}
                  type="submit"
                >
                  Create Collection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default UserCollection
