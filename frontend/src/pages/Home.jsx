import Marquee from "react-fast-marquee"
import CarouselCard from "@/components/CarouselCard"
import { Button } from "@/components/ui/button"
import RecipeCard from "@/components/RecipeCard"

//  Mock up data for carausel
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    duration: "30 minutes",
    image:
      "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    duration: "45 minutes",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Beef Stroganoff",
    duration: "40 minutes",
    image:
      "https://images.unsplash.com/photo-1694345598429-00511c301452?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    duration: "25 minutes",
    image:
      "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.3,
  },
  {
    id: 5,
    title: "Fish Tacos",
    duration: "35 minutes",
    image:
      "https://plus.unsplash.com/premium_photo-1672976349009-918d041258aa?q=80&w=2445&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
  },
  {
    id: 6,
    title: "Classic Cheeseburger",
    duration: "20 minutes",
    image:
      "https://plus.unsplash.com/premium_photo-1675864534274-3652b78bfff1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
  },
]

function Home() {
  return (
    <div className="flex flex-col items-center">
      <img
        className="object-cover w-full h-[525px] mb-20"
        src="landing-image.png"
        alt=""
      />

      <h2 className="text-[64px] text-center font-georgia w-[800px] mb-5">
        Discover Culinary Wonders from Around the Globe
      </h2>

      <p className="mb-10 text-2xl font-avenir-regular">
        Embark on a journey through flavors and traditions from all corners of
        the world.
      </p>

      <Button className="py-6 mb-20 rounded-full">Get Started</Button>

      {/* Carousel Marquee */}
      <Marquee autoFill className="mb-20">
        {recipes.map((recipe) => (
          <CarouselCard key={recipe.id} recipe={recipe} />
        ))}
      </Marquee>

      {/* Popular Recipes */}
      <div className="flex flex-col w-full gap-4 px-[80px] mb-20">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-avenir-medium">Popular Recipe</h3>
          <p className="text-gray-500">View more</p>
        </div>
        <div className="flex gap-6">
          <RecipeCard recipe={recipes[1]} />
          <RecipeCard recipe={recipes[5]} />
          <RecipeCard recipe={recipes[3]} />
          <RecipeCard recipe={recipes[5]} />
        </div>
      </div>

      {/* Additional Information */}
      <div className="w-full h-[560px] bg-[#DE3725] flex flex-col justify-center items-center">
        <h3 className="text-[64px] bg-inherit font-georgia text-white">
          Cook, Share, Delight
        </h3>
        <p className="text-white font-avenir-book text-[24px] mt-3">
          Create delicious and nutritious meals from simple, easy-to-follow
          recipes that impress.
        </p>
        <p className="text-white font-avenir-book text-[24px] mt-1">
          Inspire your inner chef with recipes from food lovers everywhere.
        </p>

        <div className="flex gap-2 mt-10 bg-inherit">
          <Button className="py-6 rounded-full">Get Started</Button>
          <Button className="py-6 text-black bg-white rounded-full hover:bg-white">
            View Recipes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
