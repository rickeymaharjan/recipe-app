require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

// Import required modules
const userRoutes = require("./routes/user")
const recipeRoutes = require("./routes/recipe")
const collectionRoutes = require("./routes/collection")

// Create an instance of Express
const app = express()

// Set up middleware
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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    // Start the server
    app.listen(3000, () => {
      console.log(
        `Server started on port http://localhost:${process.env.PORT}/`
      )
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })
