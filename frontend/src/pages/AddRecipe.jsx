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

import { useState } from "react"

// Icons
import { IoCameraOutline } from "react-icons/io5"
import { IoTimeOutline } from "react-icons/io5"
import { IoFastFoodOutline } from "react-icons/io5"

// Custom Components
import IngredientInput from "@/components/recipeForm/IngredientInput"
import InstructionInput from "@/components/recipeForm/InstructionInput"

function AddRecipe() {
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }])

  const [instructions, setInstructions] = useState(Array(4).fill(""))

  return (
    <div className="bg-[#F8FAFC] w-fullborder common-padding py-10 gap-6 flex flex-col xl:flex-row">
      {/* Left side */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-avenir-medium text-gray-500 font-bold">
          RECIPE INFORMATION
        </p>

        {/* Left container */}
        <div className="w-full xl:w-[500px] p-6 bg-white rounded-xl flex flex-col gap-5 shadow-sm">
          {/* Recipe Image */}
          <div className="bg-[#F8FAFC] w-full xl:h-[180px] h-[230px] border border-dashed rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <IoCameraOutline size={25} className="text-gray-400" />
              <span className="text-sm font-avenir-medium underline">
                upload image
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="grid w-full gap-1.5">
            <Label
              htmlFor="message"
              className="text-gray-500 font-avenir-regular"
            >
              Description
            </Label>
            <Textarea
              placeholder="Type recipe description here."
              id="message"
            />
          </div>

          {/* Recipe name */}
          <div className="grid w-full items-center gap-1.5">
            <Label
              htmlFor="recipename"
              className="text-gray-500 font-avenir-regular"
            >
              Recipe name
            </Label>
            <Input
              type="text"
              id="recipename"
              placeholder="eg: poached eggs on toast"
            />
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="servings"
              className="text-gray-500 font-avenir-regular"
            >
              Category
            </Label>
            <Select>
              <SelectTrigger className="w-ful">
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
            <Input type="number" id="servings" placeholder="eg: 3 or 4-5" />
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
                <Input type="number" id="cookTime" placeholder="e.g: 30 mins" />
              </div>

              <div className="flex-1">
                <Label
                  htmlFor="prepTime"
                  className="text-gray-500 font-avenir-regular"
                >
                  Prep Time
                </Label>
                <Input type="number" id="prepTime" placeholder="e.g: 15 mins" />
              </div>
            </div>
          </div>

          {/* Nuritions */}
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
                />
              </div>

              <div>
                <Label
                  htmlFor="fiber"
                  className="text-gray-500 font-avenir-regular"
                >
                  Fiber
                </Label>
                <Input type="text" id="fiber" placeholder="e.g., 5g fiber" />
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
                />
              </div>

              <div>
                <Label
                  htmlFor="carbs"
                  className="text-gray-500 font-avenir-regular"
                >
                  Carbs
                </Label>
                <Input type="text" id="carbs" placeholder="e.g., 50g carbs" />
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
  )
}

export default AddRecipe
