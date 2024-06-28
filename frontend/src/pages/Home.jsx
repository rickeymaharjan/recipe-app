import React, { useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const drawerContent = (
    <div className="py-10 px-1 mx-[100px] flex gap-20 bg-gray-50">
      {/* Left side */}
      <div className="bg-red-200 p-3">
        {/* recipe image */}
        <div className="w-[350px] h-[500px] mb-8">
          <img
            className="w-full h-full object-cover rounded-sm"
            src="recipe.jpg"
            alt="recipe image"
          />
        </div>

        {/* Ingredients list */}
        <div className="max-w-[350px] bg-blue-200">
          <p className="mb-2 text-3xl font-recipeTitle font-bold italic">
            Ingredients
          </p>

          <div className="flex flex-col">
            <div className="flex justify-between">
              <p>Tomatoes</p>
              <p>400g</p>
            </div>

            <div className="flex justify-between">
              <p>Chickpeas</p>
              <p>230g</p>
            </div>

            <div className="flex justify-between">
              <p>Mushrooms</p>
              <p>160g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 pt-5 bg-red-200 p-3">
        {/* Recipe info */}
        <div className="flex flex-col gap-8 bg-blue-200">
          <p className="text-6xl w-[455px] font-recipeTitle font-bold italic">
            Chickpea & coconut curry
          </p>

          <p>
            Our Chickpea and Coconut Curry is a tantalizing blend of tender
            chickpeas, vibrant bell peppers, and spinach, simmered in a creamy
            coconut milk sauce infused with curry spices. Perfect over rice or
            with naan, it&apos;s a vegan-friendly dish that promises to satisfy
            with every flavorful bite.
          </p>

          <div className="flex gap-5">
            <p>Total 40m</p>
            <p>Prep 40m</p>
            <p>Cook 40m</p>
          </div>

          <div>Nutrition per serving</div>

          {/* Instructions */}
          <div className="bg-green-200">
            <p className="mb-2 text-3xl font-recipeTitle font-bold italic">
              Instructions
            </p>
            <ol className="flex flex-col gap-1">
              <li>
                Heat the vegetable oil in a large pan over medium heat. Add the
                chopped onion and cook until softened, about 5 minutes.{" "}
              </li>
              <li>
                Sprinkle in the curry powder and stir well to coat the onion
                mixture. Cook for about 1 minute to toast the spices.
              </li>
              <li>
                Pour in the diced tomatoes and coconut milk, stirring to
                combine. Bring the mixture to a simmer.
              </li>
              <li>
                Add the drained chickpeas to the pan, stirring them into the
                curry sauce. Simmer for 10-15 minutes, allowing the flavors to
                meld together. Season with salt and pepper to taste.
              </li>
              <li>
                Remove from heat and garnish with chopped fresh cilantro if
                desired. Serve the curry over cooked rice or with naan. Enjoy!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )

  return <div>home</div>
}

export default Home
