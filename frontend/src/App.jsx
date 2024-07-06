import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"
import BaseLayout from "./pages/BaseLayout"

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without layout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Routes with layout */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="recipe" element={<Recipe />} />
          {/* Add more routes with BaseLayout here */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
