require("dotenv").config()
const express = require("express")
const cors = require("cors")

// Import required modules
const userRoutes = require("./routes/user")
const recipeRoutes = require("./routes/recipe")
const collectionRoutes = require("./routes/collection")
const reviewRoutes = require("./routes/review")
const mealPlanRoutes = require("./routes/mealPlan")

const connectDB = require("./config/db")

// Create an instance of Express
const app = express()

// Set up middleware
app.use(cors())
app.use(express.json())

// Request logger
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(requestLogger)

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.use("/api/users", userRoutes)
app.use("/api/recipes", recipeRoutes)
app.use("/api/collections", collectionRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/mealplans", mealPlanRoutes)

connectDB().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
  })
})
