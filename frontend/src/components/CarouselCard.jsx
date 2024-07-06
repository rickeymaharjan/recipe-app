import { WiTime4 } from "react-icons/wi"

function CarouselCard({ recipe }) {
  return (
    <div className="relative w-[270px] h-[390px] mx-3 overflow-hidden rounded-2xl">
      {/* Image with gradient overlay */}
      <img
        className="object-cover w-full h-full rounded-2xl "
        src={recipe.image}
        alt={recipe.title}
      />

      {/* Gradient overlay */}

      {/* Text overlay */}
      <div
        className="absolute bottom-0 w-full p-2 text-white bg-transparent top-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2),rgba(0,0,0,0.7))",
        }}
      >
        <div className="absolute bg-transparent bottom-5 left-5 font-avenir-medium">
          <h3 className="text-lg bg-transparent">{recipe.title}</h3>
          <div className="flex items-center gap-1 bg-transparent ">
            <WiTime4 className="bg-transparent" size={20} />
            <p className="text-sm bg-transparent ">{recipe.duration}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselCard
