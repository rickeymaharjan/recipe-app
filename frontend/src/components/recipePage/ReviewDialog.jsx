import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"

import StarRating from "../StarRating"

import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ReviewDialog = ({ setRecipeData, username, title }) => {
  const { recipeId } = useParams()

  const [reviewData, setReviewData] = useState({
    rating: 1,
    comment: "",
    title: "",
  })

  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (e) => {
    const { value, id } = e.target
    setReviewData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${recipeId}`,
        { reviewData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setRecipeData((prev) => ({
        ...prev,
        reviews: [...prev.reviews, response.data],
      }))
      toast.success("Review submitted successfully")
      setIsOpen(false)
    } catch (error) {
      toast.error("Failed to submit review")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-avenir-regular text-sm p-3 h-8">
          Leave a review
        </Button>
      </DialogTrigger>
      <DialogContent className="py-10 rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-avenir-heavy text-2xl text-center">
            How would you rate
          </DialogTitle>
          <DialogDescription className="font-avenir-regular text-center">
            {title} | {username}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-3">
            <StarRating
              rating={reviewData.rating}
              size={28}
              setRating={(newRating) =>
                setReviewData((prev) => ({ ...prev, rating: newRating }))
              }
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Review title</Label>
              <Input
                id="title"
                value={reviewData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="comment">
                Let others know how you think about this recipe
              </Label>
              <Textarea
                id="comment"
                rows={5}
                placeholder="Write your review"
                value={reviewData.comment}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0 mt-3">
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="rounded-full text-sm p-4 h-9 w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-full text-sm p-4 h-9">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog
