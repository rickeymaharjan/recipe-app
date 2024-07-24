require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const Grid = require("gridfs-stream")
const cors = require("cors")

// Import required modules
const userRoutes = require("./routes/user")
const recipeRoutes = require("./routes/recipe")
const collectionRoutes = require("./routes/collection")

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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")

    // // Initialize GridFS
    // const conn = mongoose.connection
    // const gfs = Grid(conn.db, mongoose.mongo)
    // gfs.collection("uploads")

    // // Make gfs available globally
    // app.locals.gfs = gfs

    // Start the server
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server started on port http://localhost:${process.env.PORT || 3000}/`
      )
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })
