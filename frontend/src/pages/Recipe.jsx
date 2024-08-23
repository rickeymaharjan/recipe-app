// ShadCn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DialogPop from "@/components/DialogPop"
import { Button } from "@/components/ui/button"

// Icons
import { LuBookmark } from "react-icons/lu"
import { LuPlus } from "react-icons/lu"

// React
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"
import NotFound from "./NotFound"
import RecipePageSkeleton from "@/components/recipePage/RecipePageSkeleton"
import { useSelector } from "react-redux"
import { format } from "date-fns"

const Nutrition = ({ title, amount }) => {
  return (
    <div className="bg-black w-[68px] h-[110px] flex flex-col items-center py-3 rounded-full">
      <div className="flex items-center justify-center w-12 h-12 mb-2 bg-white rounded-full">
        {amount}
      </div>
      <span className="text-sm text-white bg-black">{title}</span>
    </div>
  )
}

const Instruction = ({ index, description }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-5 h-5 p-4 text-sm text-white bg-black rounded-full">
        {index}
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

function Recipe() {
  const { recipeId } = useParams()
  const auth = useSelector((state) => state.auth.user)

  const [recipeData, setRecipeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${recipeId}`
        )
        setRecipeData(response.data)
      } catch (error) {
        setError(error.response.data.error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipeData()
  }, [recipeId])

  const isOwner =
    recipeData && auth ? auth._id === recipeData.createdBy._id : false

  if (loading) return <RecipePageSkeleton />

  if (error) return <NotFound />

  return (
    <div className="flex flex-col px-[100px] mb-5 mt-2">
      {/* Profile section */}
      <div className="sticky top-0 flex items-center justify-between w-full py-3 mb-4 bg-gray-50">
        <div className="flex">
          <Link to={`/${recipeData.createdBy.username}`}>
            <Avatar className="w-12 h-12 cursor-pointer">
              <AvatarImage src={recipeData.createdBy.profileImage} />
              <AvatarFallback>
                {recipeData.createdBy.username[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col justify-center ml-4">
            <Link to={`/${recipeData.createdBy.username}`}>
              <p className="font-avenir-medium cursor-pointer">
                {recipeData.createdBy.username}
              </p>
            </Link>
            <p className="text-sm text-gray-500 font-avenir-medium">
              {format(new Date(recipeData.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          {isOwner ? (
            <Button className="rounded-full">Edit recipe</Button>
          ) : (
            <>
              <DialogPop title="collection">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-[35px] h-[35px]">
                        {" "}
                        <LuBookmark
                          className="p-[10px] rounded-full bg-black cursor-pointer"
                          size={35}
                          color="white"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Collection</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogPop>

              <DialogPop title="meal plan">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-[35px] h-[35px]">
                        {" "}
                        <LuPlus
                          className="p-[10px] rounded-full bg-black cursor-pointer"
                          size={35}
                          color="white"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Meal Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogPop>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-16 bg-gray-50">
        {/* Left side */}
        <div className="w-[380px]">
          {/* recipe image */}
          <div className="w-full h-[530px] mb-8">
            <img
              className="object-cover w-full h-full rounded-md"
              src={recipeData.imageFilename}
              alt="recipe image"
            />
          </div>

          {/* Ingredients list */}
          <div className="w-full bg-white border px-[30px] py-[25px] rounded-xl">
            <p className="mb-4 text-3xl italic font-bold font-recipeTitle">
              Ingredients
            </p>

            <div className="flex flex-col">
              {recipeData.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex justify-between pb-3 text-gray-500 bg-white font-avenir-medium"
                >
                  <p>{ingredient.name}</p>
                  <p className="text-black font-avenir-medium">
                    {ingredient.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 pt-3">
          {/* Recipe info */}
          <div className="flex flex-col gap-8">
            <p className="text-6xl w-[460px] max-w-[600px] font-recipeTitle font-bold italic leading-[75px]">
              {recipeData.title}
            </p>

            <p className="text-gray-500">{recipeData.description}</p>

            <div className="flex gap-5">
              <p className="text-gray-500 font-avenir-medium">
                Total <span className="text-black font-avenir-medium">40m</span>
              </p>
              <p className="text-gray-500 font-avenir-medium">
                Prep <span className="text-black font-avenir-medium">20m</span>
              </p>
              <p className="text-gray-500 font-avenir-medium">
                Cooking{" "}
                <span className="text-black font-avenir-medium">20m</span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-avenir-medium">Nutrition per serving</div>

              <div className="flex gap-4">
                <Nutrition title="Calories" amount="250" />
                <Nutrition title="Protein" amount="2.5g" />
                <Nutrition title="Carbs" amount="25g" />
                <Nutrition title="Fiber" amount="3.5g" />
              </div>
            </div>

            {/* Instructions */}
            <div className="flex flex-col gap-1 bg-white border px-[30px] py-[25px] rounded-xl">
              <p className="mb-4 text-3xl italic font-bold font-recipeTitle">
                Instructions
              </p>
              {recipeData.instructions.map((instruction, index) => (
                <Instruction
                  key={index}
                  index={index + 1}
                  description={instruction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe
