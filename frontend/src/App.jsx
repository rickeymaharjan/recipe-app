import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"
import BaseLayout from "./layouts/BaseLayout"
import AddImage from "./pages/AddImage"

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
          <Route path="addImage" element={<AddImage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
