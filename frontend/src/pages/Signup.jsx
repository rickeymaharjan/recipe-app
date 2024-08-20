// ShadCN components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// React
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { registerUser } from "@/features/authSlice"
import { useDispatch } from "react-redux"

function Signup() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    dispatch(registerUser({ email, password, username }))
  }

  return (
    // Body
    <div className="h-screen w-screen p-12 px-20 border-3 border-black flex justify-center bg-gray-50">
      {/* Left side (form)*/}
      <div className="flex-1 flex justify-center">
        <div className="max-w-md flex flex-col flex-1 justify-center">
          <h1 className="xl:font-title font-bold text-2xl text-center xl:text-left">
            Signup
          </h1>

          <p className="text-center text-sm text-gray-500 mb-8 xl:text-left xl:text-base xl:mb-6">
            Register your new account
          </p>

          <div className="grid w-full max-w-md items-center gap-1.5 mb-4">
            <Label htmlFor="email">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="grid w-full max-w-md items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="grid w-full max-w-md items-center gap-1.5 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </div>

          <Button className="mb-8 xl:mb-6" onClick={handleLogin}>
            {auth.loading ? "Loading..." : "Signup"}
          </Button>

          {auth.error ? <p className="text-red-500">{auth.error}</p> : null}

          <p className="text-sm text-gray-500 mb-2">
            Already have an account?{" "}
            <Link className="text-black font-semibold" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side (picture) */}
      <div className="hidden xl:flex bg-red-100 w-[525px] items-center justify-center rounded-sm shadow-md">
        <img
          src="login-image.jpg"
          alt=""
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
    </div>
  )
}

export default Signup
