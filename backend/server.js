require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

// Import required modules

// Create an instance of Express
const app = express()

// Set up middleware
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ")
  })
)

app.use(express.json())

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!")
})

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
