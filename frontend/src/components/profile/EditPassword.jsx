import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

import { useOutletContext } from "react-router-dom"

const EditPassword = () => {
  const { user, setUser } = useOutletContext()

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user.pass)
  }

  return (
    <div className="flex-1">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label className="text-base">Old password</Label>
          <Input id="password" onSubmit={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label className="text-base">New password</Label>
          <Input />
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

export default EditPassword
