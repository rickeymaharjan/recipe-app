import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"

import { IoTrashOutline } from "react-icons/io5"
import { HiOutlinePlus } from "react-icons/hi"

function IngredientInput({ ingredients, setIngredients }) {
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }])
  }

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-gray-500 font-avenir-regular">Ingredients</Label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center gap-3">
          <Input
            className="w-1/3"
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleDeleteIngredient(index)}
            className="text-gray-400"
          >
            <IoTrashOutline size={18} />
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={handleAddIngredient}
        className="mt-2 flex items-center gap-1"
      >
        <HiOutlinePlus />
        Add Ingredient
      </Button>
    </div>
  )
}

export default IngredientInput
