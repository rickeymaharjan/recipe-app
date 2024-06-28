import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
