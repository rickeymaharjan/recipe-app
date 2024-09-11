import { Button } from "../ui/button"
import AuthRedirect from "../AuthRedirect"
import ReviewDialog from "./ReviewDialog"
import StarRating from "../StarRating"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { ScrollArea } from "../ui/scroll-area"

import { Link } from "react-router-dom"

import { formatDistanceToNow } from "date-fns"

const RecipeReviews = ({
  reviews,
  setRecipeData,
  averageRating,
  username,
  title,
}) => {
  return (
    <div className="flex flex-col gap-6 bg-white border px-[30px] py-[25px] rounded-xl">
      <p className="text-3xl italic font-bold font-recipeTitle">
        Rating and Reviews
      </p>

      {/* Summary */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center mb-2">
          <span className="font-recipeTitle text-5xl translate-y-[-10px]">
            {averageRating}
          </span>
          <div className="flex flex-col gap-1 items-center">
            <StarRating rating={averageRating} readOnly size={28} />
            <span className="font-avenir-regular text-xs text-gray-500">
              {!reviews.length ? (
                "0 reviews"
              ) : (
                <span>{reviews.length} reviews</span>
              )}
            </span>
          </div>
        </div>
        <AuthRedirect
          Component={ReviewDialog}
          setRecipeData={setRecipeData}
          username={username}
          title={title}
        >
          <Button className="font-avenir-regular text-sm p-3 h-8">
            Leave a review
          </Button>
        </AuthRedirect>
      </div>

      {/* Reviews */}
      <ScrollArea className="h-[400px] w-full rounded-md">
        <div className="flex flex-col gap-4">
          {!reviews.length ? (
            <div className="p-10 text-center">
              <p className="text-gray-500">No reviews yet</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-md py-4 px-4 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link to={`/${review.createdBy.username}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.createdBy.profileImage} />
                        <AvatarFallback>
                          {review.createdBy.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="ml-2">
                      <Link to={`/${review.createdBy.username}`}>
                        <p className="font-bold text-sm">
                          {review.createdBy.username}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(review.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} readOnly />
                  </div>
                </div>
                <div>
                  <p className="font-bold mb-1">{review.title}</p>
                  <p className="text-gray-500 text-sm">{review.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default RecipeReviews
