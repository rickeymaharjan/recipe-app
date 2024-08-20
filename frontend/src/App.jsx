import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"
import BaseLayout from "./layouts/BaseLayout"
import AddRecipe from "./pages/AddRecipe"
import Profile from "./pages/Profile"
import UserRecipe from "@/components/profile/UserRecipe"

import { checkToken, selectAuthToken, selectUser } from "./features/authSlice"
import WithAuthRedirect from "./auth/WithAuthRedirect"
import UserCollection from "./components/profile/UserCollection"
import UserMealPlanning from "./components/profile/UserMealPlanning"

function App() {
  const token = useSelector(selectAuthToken)
  const user = useSelector(selectUser)

  let loggedInUsername = null
  if (user) {
    loggedInUsername = user.username
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(checkToken())
    }
  }, [dispatch, token])

  const ProtectedLogin = WithAuthRedirect(Login, "/")
  const ProtectedSignup = WithAuthRedirect(Signup, "/")
  const ProtectedAddRecipe = WithAuthRedirect(AddRecipe)

  // Wrap components that require authentication
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/signup" element={<ProtectedSignup />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/add-recipe" element={<ProtectedAddRecipe />} />

        {/* Routes with layout */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route
            path=":username"
            element={<Profile loggedInUsername={loggedInUsername} />}
          >
            <Route
              index
              element={<UserRecipe loggedInUsername={loggedInUsername} />}
            />
            <Route
              path="collections"
              element={<UserCollection loggedInUsername={loggedInUsername} />}
            />
            <Route
              path="meals"
              element={<UserMealPlanning loggedInUsername={loggedInUsername} />}
            />
          </Route>
          <Route
            path="recipe/:recipeId"
            element={<Recipe loggedInUsername={loggedInUsername} />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
