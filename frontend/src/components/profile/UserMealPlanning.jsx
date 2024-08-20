// ShadCN components
import { Button } from "../ui/button"

// React
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

// Custom components
import RecipeList from "../RecipeList"
import CardSkeleton from "../CardSkeleton"
import EmptyMessage from "../recipePage/EmptyMessage"

import axios from "axios"

const UserMealPlanning = ({ loggedInUsername }) => {
  const { username } = useParams()

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isOwner = username === loggedInUsername

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/username/${username}`
        )
        setUserData(response.data)
      } catch (err) {
        setError(err.response.data.error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  if (loading) return <CardSkeleton amount={4} />

  if (error)
    return (
      <>
        <EmptyMessage message="No meal plans yet." />
        {isOwner && (
          <div className="flex justify-center">
            <Button className="rounded-full my-12">
              <Link to="/add-recipe">Create meal plan</Link>
            </Button>
          </div>
        )}
      </>
    )

  return (
    <div>
      {isOwner && (
        <div className="flex justify-center">
          <Button className="rounded-full my-12">
            <Link to="/add-recipe">Create meal plan</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserMealPlanning
