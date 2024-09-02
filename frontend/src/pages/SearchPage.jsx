import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import axios from "axios"

import CardSkeleton from "@/components/CardSkeleton"
import RecipeList from "@/components/recipePage/RecipeList"

import { IoSearchOutline } from "react-icons/io5"

const SearchPage = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes`
        )
        setRecipes(response.data)
      } catch (error) {
        setError(error.response.data.error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full relative h-[250px] sm:h-[350px] md:h-[400px]">
        <div className="relative">
          <img
            className="object-cover object-center w-full h-[250px] sm:h-[350px] md:h-[400px] mb-14 xl:mb-20 opacity-90"
            src="https://cdn.dribbble.com/userupload/10411468/file/original-1ac62426e38d97a11616f025b0cf2409.png?resize=1504x1128"
            alt=""
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-logo font-bold text-6xl text-[#F9FAFB] mb-2">
              Search Delicious Ideas
            </p>
            <p className="text-lg font-avenir-medium font-bold text-[#F9FAFB] mb-10">
              Discover endless recipe ideas from talented chefs and home cooks
            </p>
            <div>
              <div className="relative w-[350px] h-[55px]">
                <Input
                  className="w-full h-full pl-14 text-base rounded-full "
                  placeholder="Search recipes"
                />
                <div className="absolute inset-y-0 flex items-center bg-transparent left-5">
                  <IoSearchOutline size={23} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-10 text-gray-500">
        <Label className="font-avenir-regular">Suggested: </Label>
        <Label className="font-avenir-regular cursor-pointer">Breakfast </Label>
        <Label className="font-avenir-regular cursor-pointer">Lunch </Label>
        <Label className="font-avenir-regular cursor-pointer">Dinner </Label>
        <Label className="font-avenir-regular cursor-pointer">
          Appetizers{" "}
        </Label>
      </div>

      {/* Recipes */}
      <div className="common-padding my-10 w-full">
        {loading ? (
          <CardSkeleton amount={8} />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    </div>
  )
}

export default SearchPage
