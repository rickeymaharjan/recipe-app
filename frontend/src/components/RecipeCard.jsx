import { LuBookmark } from "react-icons/lu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WiTime4 } from "react-icons/wi"

import { useNavigate } from "react-router-dom"

function RecipeCard({ recipe }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`)
  }

  const handleBookmarkClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden rounded-2xl"
        onClick={handleCardClick}
      >
        {/* Image */}
        <img
          className="object-cover w-full aspect-[4/3] rounded-2xl "
          src={recipe.imageFilename}
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
          <div className="absolute bottom-0 left-0 right-0 font-avenir-medium">
            <div className="flex items-center justify-between p-4 bg-transparent">
              <div className="bg-transparent">
                <p className="text-base">{recipe.title}</p>
                <div className="flex items-center gap-1 bg-transparent ">
                  <WiTime4 className="bg-transparent" size={20} />
                  <p className="text-sm bg-transparent ">
                    {recipe.totalTime} mins
                  </p>
                </div>
              </div>
              <LuBookmark
                onClick={handleBookmarkClick}
                className="p-[10px] rounded-full bg-white"
                size={35}
                color="black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="w-7 h-7">
          <AvatarImage src={recipe.createdBy.profileImage} />
          <AvatarFallback>{recipe.createdBy.username[0]}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-avenir-medium">
          {recipe.createdBy.username}
        </p>
      </div>
    </div>
  )
}

export default RecipeCard
