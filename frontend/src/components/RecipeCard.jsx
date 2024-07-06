import { LuBookmark } from "react-icons/lu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WiTime4 } from "react-icons/wi"

function RecipeCard({ recipe }) {
  const handleCardClick = () => {
    console.log("Recipe card clicked")
  }

  const handleBookmarkClick = (event) => {
    event.stopPropagation()
    console.log("Save button clicked")
  }

  return (
    <div className="w-[320px] flex flex-col gap-2">
      <div
        className="relative w-full h-[220px] overflow-hidden rounded-2xl"
        onClick={handleCardClick}
      >
        {/* Image */}
        <img
          className="object-cover w-full h-full rounded-2xl "
          src={recipe.image}
          alt={recipe.title}
        />

        {/* Text overlay */}
        <div
          className="absolute top-0 bottom-0 w-full p-2 text-white transition-opacity duration-300 bg-transparent opacity-0 hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0),rgba(0,0,0,0.7))",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-transparent font-avenir-medium">
            <div className="flex items-center justify-between p-4 bg-transparent">
              <div className="bg-transparent">
                <p className="text-base bg-transparent ">{recipe.title}</p>
                <div className="flex items-center gap-1 bg-transparent ">
                  <WiTime4 className="bg-transparent" size={20} />
                  <p className="text-sm bg-transparent ">{recipe.duration}</p>
                </div>
              </div>
              <LuBookmark
                onClick={handleBookmarkClick}
                className="p-[10px] rounded-full"
                size={35}
                color="black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-avenir-medium">Morty Chauncey</p>
      </div>
    </div>
  )
}

export default RecipeCard
