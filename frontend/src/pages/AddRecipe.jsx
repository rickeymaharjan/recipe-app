import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Icons
import {
  IoCameraOutline,
  IoTimeOutline,
  IoFastFoodOutline,
  IoArrowBackOutline,
} from "react-icons/io5"

// Custom Components
import IngredientInput from "@/components/recipeForm/IngredientInput"
import InstructionInput from "@/components/recipeForm/InstructionInput"
import axios from "axios"

function AddRecipe() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }])
  const [instructions, setInstructions] = useState(["", ""])

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    category: "",
    servings: "",
    cookTime: "",
    prepTime: "",
    totalTime: "",
    ingredients: ingredients,
    instructions: instructions,
    imageFilename: "",
    nutritions: {
      calories: "",
      fiber: "",
      protein: "",
      carbs: "",
    },
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setRecipeData({ ...recipeData, [id]: value })
  }

  const handleNutritionChange = (e) => {
    const { id, value } = e.target
    setRecipeData({
      ...recipeData,
      nutritions: { ...recipeData.nutritions, [id]: value },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if there are empty fields
    const hasEmptyIngredient = ingredients.some(
      (ingredient) => !ingredient.name || !ingredient.quantity
    )
    const hasEmptyInstruction = instructions.some((instruction) => !instruction)

    if (hasEmptyIngredient || hasEmptyInstruction) {
      toast.error("Please fill in all the ingredient and instruction fields.")
      return
    }

    // Check if there are no ingredients or instructions
    if (!ingredients.length || !instructions.length) {
      toast.error(
        "You cannot submit a recipe without ingredients or instructions."
      )
      return
    }

    // Calculate the total time and update recipeData
    const updatedRecipeData = {
      ...recipeData,
      totalTime: parseInt(recipeData.cookTime) + parseInt(recipeData.prepTime),
      ingredients: ingredients,
      instructions: instructions,
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        updatedRecipeData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate(-1)
      toast.success("Recipe uploaded successfully.")
    } catch (error) {
      toast.error("Failed to upload recipe.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="common-padding h-[75px] border flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <IoArrowBackOutline
            className="p-[10px] rounded-md bg-white cursor-pointer border"
            size={43}
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-avenir-medium font-bold">
              Add a new recipe
            </h2>
            <span className="text-xs font-avenir-regular text-gray-600">
              Let others taste your kitchen expertise.
            </span>
          </div>
        </div>
        <div>
          <Button type="submit">Add recipe</Button>
        </div>
      </div>

      <div className="bg-[#F8FAFC] w-fullborder common-padding py-8 gap-6 flex flex-col xl:flex-row">
        {/* Left side */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-avenir-medium text-gray-500 font-bold">
            RECIPE INFORMATION
          </p>

          {/* Left container */}
          <div className="w-full xl:w-[500px] p-6 bg-white rounded-xl flex flex-col gap-5 shadow-sm">
            {/* Recipe Image */}
            <div className="bg-[#F8FAFC] w-full xl:h-[180px] h-[230px] border border-dashed rounded-xl flex items-center justify-center">
              {recipeData.imageFilename ? (
                <img
                  src={recipeData.imageFilename}
                  alt="recipe image"
                  className="object-cover w-full h-full rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <IoCameraOutline size={25} className="text-gray-400" />
                  <span className="text-sm font-avenir-medium underline">
                    upload image
                  </span>
                </div>
              )}
            </div>

            {/* Image url (temporary) */}
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="imageFilename"
                className="text-gray-500 font-avenir-regular"
              >
                Image URL
              </Label>
              <Input
                type="text"
                id="imageFilename"
                placeholder="Image url"
                value={recipeData.imageFilename}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className="grid w-full gap-1.5">
              <Label
                htmlFor="description"
                className="text-gray-500 font-avenir-regular"
              >
                Description
              </Label>
              <Textarea
                placeholder="Type recipe description here."
                id="description"
                value={recipeData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Recipe name */}
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="title"
                className="text-gray-500 font-avenir-regular"
              >
                Recipe name
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="eg: poached eggs on toast"
                value={recipeData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label
                htmlFor="category"
                className="text-gray-500 font-avenir-regular"
              >
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setRecipeData({ ...recipeData, category: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Servings */}
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="servings"
                className="text-gray-500 font-avenir-regular"
              >
                Servings
              </Label>
              <Input
                type="number"
                id="servings"
                placeholder="eg: 3 or 4-5"
                value={recipeData.servings}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Cook time */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <IoTimeOutline className="text-gray-500" size={20} />
                <Label className="text-md font-bold translate-y-[1px]">
                  Duration
                </Label>
              </div>
              <div className="flex w-full justify-center gap-5">
                <div className="flex-1">
                  <Label
                    htmlFor="cookTime"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Cook Time
                  </Label>
                  <Input
                    type="number"
                    id="cookTime"
                    placeholder="e.g: 30 mins"
                    value={recipeData.cookTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex-1">
                  <Label
                    htmlFor="prepTime"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Prep Time
                  </Label>
                  <Input
                    type="number"
                    id="prepTime"
                    placeholder="e.g: 15 mins"
                    value={recipeData.prepTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Nutritions */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <IoFastFoodOutline className="text-gray-500" size={20} />
                <Label className="text-md font-bold translate-y-[2px]">
                  Nutritions
                </Label>
              </div>

              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label
                    htmlFor="calories"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Calories
                  </Label>
                  <Input
                    type="text"
                    id="calories"
                    placeholder="e.g., 300 calories"
                    value={recipeData.nutritions.calories}
                    onChange={handleNutritionChange}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="fiber"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Fiber
                  </Label>
                  <Input
                    type="text"
                    id="fiber"
                    placeholder="e.g., 5g fiber"
                    value={recipeData.nutritions.fiber}
                    onChange={handleNutritionChange}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="protein"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Protein
                  </Label>
                  <Input
                    type="text"
                    id="protein"
                    placeholder="e.g., 20g protein"
                    value={recipeData.nutritions.protein}
                    onChange={handleNutritionChange}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="carbs"
                    className="text-gray-500 font-avenir-regular"
                  >
                    Carbs
                  </Label>
                  <Input
                    type="text"
                    id="carbs"
                    placeholder="e.g., 40g carbs"
                    value={recipeData.nutritions.carbs}
                    onChange={handleNutritionChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-sm font-avenir-medium text-gray-500 font-bold">
            RECIPE DETAIL
          </p>
          {/* Right containers */}
          <div className="flex flex-col gap-6">
            {/* Ingredients */}
            <div className="bg-white w-full rounded-xl shadow-sm p-6">
              <IngredientInput
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            </div>

            {/* Instructions */}
            <div className="bg-white w-full rounded-xl shadow-sm p-6">
              <InstructionInput
                instructions={instructions}
                setInstructions={setInstructions}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </form>
  )
}

export default AddRecipe
