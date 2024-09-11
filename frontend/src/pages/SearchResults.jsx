import { Input } from "@/components/ui/input"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import RecipeList from "@/components/recipePage/RecipeList"
import CardSkeleton from "@/components/CardSkeleton"

import axios from "axios"

// Icons
import { IoSearchOutline } from "react-icons/io5"

const SearchResults = () => {
  const { query } = useParams()
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const displayQuery = query.replace(/-/g, " ")
  const [newQuery, setNewQuery] = useState(displayQuery)

  useEffect(() => {
    const formattedQuery = query.trim().replace(/\s+/g, "-")

    if (query !== formattedQuery) {
      navigate(`/search/${formattedQuery}`, { replace: true })
    }
  }, [query, navigate])

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes/search`,
          { params: { displayQuery } }
        )
        setRecipes(response.data)
      } catch (error) {
        setError(error.response.data.error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [displayQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedQuery = newQuery.trim().replace(/\s+/g, "-")
    if (formattedQuery) {
      window.location.href = `/search/${formattedQuery}`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-red-400 to-rose-600 h-28 relative">
        <div className="absolute inset-x-0 bottom-[-27px] flex justify-center">
          <div className="w-full max-w-[600px] h-[55px] px-14 relative">
            <form onSubmit={handleSubmit} className="w-full h-full">
              <Input
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                className="w-full h-full pl-14 text-base rounded-full"
                placeholder="Search recipes"
              />
              <div className="absolute inset-y-0 flex items-center bg-transparent left-[77px]">
                <IoSearchOutline size={23} />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full mt-14">
        <h1 className="text-4xl font-avenir-heavy text-center">
          {displayQuery}
        </h1>
        <p className="text-center text-gray-500 mt-3">
          Showing results for {displayQuery}
        </p>
      </div>

      {/* Display recipes or error */}
      <div className="common-padding py-10">
        {error && <p className="text-red-500">{error}</p>}
        {loading && (
          <>
            <CardSkeleton amount={4} />
          </>
        )}
        {recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          !loading && (
            <div className="flex flex-col justify-center items-center">
              <img
                src="https://cdn.dribbble.com/users/2394319/screenshots/4773525/media/3abebd7f14032c54245cb54cf48d17a3.png?resize=800x600&vertical=center"
                alt="no-results"
                className="h-[400px] object-contain mt-[-30px]"
              />
              <h2 className="text-xl font-avenir-heavy">No results found</h2>
              <p className="text-gray-400">Try searching for other recipes.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default SearchResults
