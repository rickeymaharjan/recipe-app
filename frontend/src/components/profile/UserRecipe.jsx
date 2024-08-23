// ShadCN components
import { Button } from "../ui/button"

// React
import { Link, useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"

// Custom components
import RecipeList from "../recipePage/RecipeList"
import CardSkeleton from "../CardSkeleton"
import EmptyMessage from "../recipePage/EmptyMessage"

import axios from "axios"

const UserRecipe = () => {
  const { userData, isOwner } = useOutletContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [recipes, setRecipes] = useState([])

  // Fetching user recipes
  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (userData && userData._id) {
        setLoading(true)
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/recipes/user/${
              userData._id
            }`
          )
          setRecipes(response.data)
        } catch (error) {
          console.log(error)
          setError(error.response.data.error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserRecipes()
  }, [userData])

  if (loading) return <CardSkeleton amount={4} />
  if (error)
    return (
      <>
        <EmptyMessage message="No recipes yet." />
        {isOwner && (
          <div className="flex justify-center">
            <Button className="rounded-full my-12">
              <Link to="/add-recipe">Add Recipe</Link>
            </Button>
          </div>
        )}
      </>
    )

  return (
    <div className="mb-10">
      <RecipeList recipes={recipes} />
      {isOwner && (
        <div className="flex justify-center">
          <Button className="rounded-full my-12">
            <Link to="/add-recipe">Add Recipe</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserRecipe
