import { useEffect, useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"

import CardSkeleton from "@/components/CardSkeleton"
import RecipeList from "@/components/recipePage/RecipeList"

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("BreakFast")

  const tabs = [
    { name: "BreakFast", path: "" },
    { name: "Lunch", path: "" },
    { name: "Dinner", path: "" },
  ]

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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
    // Logic
  }

  if (loading)
    return (
      <div className="common-padding py-6">
        <CardSkeleton amount={12} />
      </div>
    )
  if (error) return <div>Error: {error}</div>

  return (
    <div className="common-padding min-h-[100vh] py-6 bg-white">
      <div className="flex mb-4 justify-between items-center">
        <Button variant="outline" className="rounded-lg font-avenir-medium">
          Popular
        </Button>

        <div className="flex gap-1">
          {tabs.map((tab, index) => (
            <span
              key={index}
              onClick={() => handleTabClick(tab.name)}
              className={`font-avenir-medium font-bold cursor-pointer px-3 py-[2px] rounded-full ${
                activeTab === tab.name
                  ? "text-black bg-red-50"
                  : "text-gray-500"
              }`}
            >
              {tab.name}
            </span>
          ))}
        </div>

        <Button variant="outline" className="rounded-full font-avenir-medium">
          Filters
        </Button>
      </div>
      <RecipeList recipes={recipes} />
    </div>
  )
}

export default Recipes
