// ShadCn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

// Icons
import { LuBookmark } from "react-icons/lu"
import { LuPlus } from "react-icons/lu"
import { IoPencilOutline } from "react-icons/io5"
import { IoTrash } from "react-icons/io5"

// React
import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import axios from "axios"
import NotFound from "./NotFound"
import RecipePageSkeleton from "@/components/recipePage/RecipePageSkeleton"
import AuthRedirect from "@/components/AuthRedirect"
import CollectionPopup from "@/components/CollectionPopup"
import MealPlanPopup from "@/components/MealPlanPopup"
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
  const navigate = useNavigate()
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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${recipeId}`
      )
      toast.success("Recipe deleted successfully")
      navigate(-1)
    } catch (error) {
      toast.error("Failed to delete recipe")
    }
  }

  if (loading) return <RecipePageSkeleton />

  if (error) return <NotFound />

  return (
    <div className="flex flex-col recipe-padding mb-5 mt-2">
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
            <>
              <IoPencilOutline
                color="white"
                size={35}
                className="p-[10px] rounded-full bg-black cursor-pointer"
                onClick={() =>
                  navigate("/edit-recipe", { state: { recipeData } })
                }
              />

              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-[35px] h-[35px] rounded-full">
                    <IoTrash
                      className="p-[10px] rounded-full bg-black cursor-pointer"
                      size={35}
                      color="white"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Recipe deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this recipe?
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        className="rounded-full mt-1 sm:mt-0"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <AuthRedirect Component={CollectionPopup}>
                <div className="w-[35px] h-[35px] rounded-full">
                  <LuBookmark
                    className="p-[10px] rounded-full bg-black cursor-pointer"
                    size={35}
                    color="white"
                  />
                </div>
              </AuthRedirect>

              <AuthRedirect Component={MealPlanPopup}>
                <div className="w-[35px] h-[35px]">
                  <LuPlus
                    className="p-[10px] rounded-full bg-black cursor-pointer"
                    size={35}
                    color="white"
                  />
                </div>
              </AuthRedirect>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-14 lg:gap-16 bg-gray-50">
        {/* Left side */}
        <div className="w-full md:w-[340px] md:min-w-[340px] lg:w-[380px]">
          {/* recipe image */}
          <div className="w-full h-[530px] md:h-[500px] lg:h-[530px] mb-8">
            <img
              className="object-cover w-full h-full rounded-md"
              src={recipeData.imageFilename}
              alt="recipe image"
            />
          </div>

          {/* Ingredients list (mobile hidden, desktop visible)*/}
          <div className="w-full bg-white border px-[30px] py-[25px] rounded-xl hidden md:flex md:flex-col">
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
        <div className="flex-1 pt-0">
          {/* Recipe info */}
          <div className="flex flex-col gap-8">
            <p className="text-5xl md:text-5xl lg:text-6xl md:pt-3 lg:pt-1 w-[460px] max-w-[600px] font-recipeTitle font-bold italic leading-[75px]">
              {recipeData.title}
            </p>

            <p className="text-gray-500">{recipeData.description}</p>

            <div className="flex gap-5">
              <p className="text-gray-500 font-avenir-medium">
                Total{" "}
                <span className="text-black font-avenir-medium">
                  {recipeData.totalTime}m
                </span>
              </p>
              <p className="text-gray-500 font-avenir-medium">
                Prep{" "}
                <span className="text-black font-avenir-medium">
                  {recipeData.prepTime}m
                </span>
              </p>
              <p className="text-gray-500 font-avenir-medium">
                Cooking{" "}
                <span className="text-black font-avenir-medium">
                  {recipeData.cookTime}m
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-avenir-medium">Nutrition per serving</div>

              <div className="flex gap-4">
                <Nutrition
                  title="Calories"
                  amount={recipeData.nutritions.calories}
                />
                <Nutrition
                  title="Protein"
                  amount={`${recipeData.nutritions.protein}g`}
                />
                <Nutrition
                  title="Carbs"
                  amount={`${recipeData.nutritions.carbs}g`}
                />
                <Nutrition
                  title="Fiber"
                  amount={`${recipeData.nutritions.fiber}g`}
                />
              </div>
            </div>

            {/* Ingredients list (mobile visible, desktop hidden)*/}
            <div className="w-full bg-white border px-[30px] py-[25px] rounded-xl md:hidden">
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
