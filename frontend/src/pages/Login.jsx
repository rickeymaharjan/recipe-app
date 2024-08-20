import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from "react-router-dom"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loginUser } from "@/features/authSlice"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    // Body
    <div className="h-screen w-screen p-12 px-20 border-3 border-black flex justify-center bg-gray-50">
      {/* Left side (form)*/}
      <form onSubmit={handleLogin} className="flex-1 flex justify-center">
        <div className="max-w-md flex flex-col flex-1 justify-center">
          <h1 className="xl:font-title font-bold text-2xl text-center xl:text-left">
            Login
          </h1>

          <p className="text-center text-sm text-gray-500 mb-8 xl:text-left xl:text-base xl:mb-6">
            Enter your credentials to login
          </p>

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

          <Button className="mb-6" type="submit">
            {auth.loading ? "Loading..." : "Login"}
          </Button>
          {auth.error ? <p className="text-red-500">{auth.error}</p> : null}

          <p className="text-sm text-gray-500 mb-2">
            Dont have an account?{" "}
            <Link className="text-black font-semibold" to="/signup">
              Sign up
            </Link>
          </p>

          <p className="text-sm font-semibold">Forgot your password?</p>
        </div>
      </form>

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

export default Login
