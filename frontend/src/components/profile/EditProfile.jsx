import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

const EditProfile = () => {
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
        { user: user.username, location: user.location, bio: user.bio }
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
          <Label className="text-base" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            defaultValue={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-base" htmlFor="location">
            Location
          </Label>
          <Input
            id="location"
            defaultValue={user.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-base" htmlFor="bio">
            Bio
          </Label>
          <Textarea
            id="bio"
            defaultValue={user.bio}
            onChange={handleChange}
            rows={5}
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

export default EditProfile
