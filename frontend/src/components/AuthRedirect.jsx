import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { useSelector } from "react-redux"

const AuthRedirect = ({ children, Component }) => {
  const auth = useSelector((state) => state.auth)
  const isAuthenticated = auth.isAuthenticated

  if (isAuthenticated) {
    return Component ? <Component /> : null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in required.</DialogTitle>
          <DialogDescription>
            To perform this action, you must first be logged in.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to="/login">
            <Button variant="outline" className="rounded-full">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="rounded-full">Sign up</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AuthRedirect
