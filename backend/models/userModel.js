const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    profileImage: { type: String },
    createdRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    mealPlans: [{ type: Schema.Types.ObjectId, ref: "MealPlan" }],
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true, strict: true }
)

userSchema.statics.signup = async function (username, email, password) {
  if (!email || !password || !username) {
    throw new Error("All fields must be filled")
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email")
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw new Error("Password not strong enough")
  // }

  try {
    const existingEmail = await this.findOne({ email })
    if (existingEmail) {
      throw new Error("Email already in use")
    }

    const existingUsername = await this.findOne({ username })
    if (existingUsername) {
      throw new Error("Username already in use")
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create and save the user
    const newUser = new this({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    return newUser
  } catch (error) {
    throw error
  }
}

// static login user
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled.")
  }

  try {
    // Check if the email is already in use
    const user = await this.findOne({ email })

    if (!user) {
      throw new Error("Invalid email.")
    }

    // Comparing password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error("Invalid password.")
    }

    return user
  } catch (error) {
    throw error
  }
}

module.exports = mongoose.model("User", userSchema)
