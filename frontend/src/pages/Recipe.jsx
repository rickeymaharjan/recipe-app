const recipeData = {
  title: "Spaghetti alle Vongole",
  description:
    "Savor the authentic taste of Italy with our Classic Italian Pasta Dish, featuring al dente pasta topped with a rich and hearty meat sauce. This sauce is a blend of ground beef, pork, and veal, slow-cooked with ripe tomatoes, garlic, onions, carrots, and celery. Infused with Italian herbs and a splash of red wine, it’s finished with freshly grated Parmesan cheese. Garnished with basil and extra Parmesan, this dish is a perfect combination of savory flavors and creamy textures, ideal for any occasion. Buon appetito!",
  image:
    "https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  instructions: [
    "Heat the oil in a large pan and add the chopped onions, garlic, and carrots. Cook for 5 minutes.",
    "Add the minced beef and cook until browned.",
    "Stir in the tomato paste and cook for another 2 minutes.",
    "Add the chopped tomatoes, beef stock, and bay leaf. Bring to a boil, then reduce heat and simmer for 30 minutes.",
    "Season with salt, pepper, and Italian herbs.",
    "Cook the spaghetti according to package instructions. Drain and serve with the sauce.",
    "Garnish with grated Parmesan cheese and fresh basil leaves.",
  ],
  ingredients: [
    { name: "Olive oil", quantity: "2 tbsp" },
    { name: "Onion", quantity: "1, finely chopped" },
    { name: "Garlic cloves", quantity: "2, minced" },
    { name: "Carrot", quantity: "1, finely chopped" },
    { name: "Minced beef", quantity: "500g" },
    { name: "Tomato paste", quantity: "2 tbsp" },
    { name: "Chopped tomatoes", quantity: "400g can" },
    { name: "Beef stock", quantity: "200ml" },
    { name: "Bay leaf", quantity: "1" },
    { name: "Salt", quantity: "to taste" },
    { name: "Black pepper", quantity: "to taste" },
    { name: "Italian herbs", quantity: "1 tsp" },
    { name: "Spaghetti", quantity: "400g" },
    { name: "Parmesan cheese", quantity: "to serve" },
    { name: "Fresh basil leaves", quantity: "to garnish" },
  ],
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DialogPop from "@/components/DialogPop"

import { LuBookmark } from "react-icons/lu"
import { LuPlus } from "react-icons/lu"

const Nutrition = ({ title, amount }) => {
  return (
    <div className="bg-black w-[68px] h-[110px] flex flex-col items-center py-3 rounded-full">
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
        {amount}
      </div>
      <span className="text-white bg-black">{title}</span>
    </div>
  )
}

const Instruction = ({ index, description }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-10 h-10 p-4 text-xl text-white bg-black rounded-full">
        {index}
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

function Recipe() {
  return (
    <div className="flex flex-col px-[100px] mb-5">
      {/* Profile section */}
      <div className="sticky top-0 flex items-center justify-between w-full py-3 mb-4 bg-gray-50">
        <div className="flex">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center ml-4">
            <p className="font-avenir-medium">Rickey Thompson</p>
            <p className="text-sm text-gray-500 font-avenir-medium">
              June 15, 2022
            </p>
          </div>
        </div>

        <div className="flex gap-1">
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
        </div>
      </div>

      <div className="flex gap-16 bg-gray-50">
        {/* Left side */}
        <div className="w-[380px]">
          {/* recipe image */}
          <div className="w-full h-[530px] mb-8">
            <img
              className="object-cover w-full h-full rounded-md"
              src={recipeData.image}
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
