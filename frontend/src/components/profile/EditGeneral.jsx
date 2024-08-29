import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"

import axios from "axios"

import { useOutletContext } from "react-router-dom"

const EditGeneral = () => {
  const { user, setUser } = useOutletContext()

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const toastId = toast.loading("Loading...")
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        { name: user.name, email: user.email }
      )
      toast.success("Profile Updated Successfully", {
        id: toastId,
      })
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        id: toastId,
      })
    }
  }

  return (
    <div className="flex-1">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="name">
            Name
          </Label>
          <Input id="name" defaultValue={user.name} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label className="text-base" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="rounded-full">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditGeneral
