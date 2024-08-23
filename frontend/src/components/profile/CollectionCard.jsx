import { useNavigate } from "react-router-dom"
import { Label } from "../ui/label"

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${collection._id}`)
  }

  // Check if recipes exist and have at least one item
  const hasRecipes = collection.recipes && collection.recipes.length > 0
  const imageSrc = hasRecipes
    ? collection.recipes[0].imageFilename
    : "https://t4.ftcdn.net/jpg/03/13/99/15/360_F_313991528_xkWq6AjZIkRu21XCF1jDqRFDx9v93M7r.jpg"

  return (
    <div
      className="flex justify-center flex-col items-center gap-3 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full aspect-[4/3] bg-gray-200 rounded-md flex justify-center items-center overflow-hidden">
        <img
          src={imageSrc}
          alt={collection.name}
          className="w-full aspect-[4/3] object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center">
        <Label className="text-sm md:text-[15px]">{collection.name}</Label>
        <Label className="text-sm md:text-[15px] text-gray-400">
          {collection.recipes.length} recipes
        </Label>
      </div>
    </div>
  )
}

export default CollectionCard
