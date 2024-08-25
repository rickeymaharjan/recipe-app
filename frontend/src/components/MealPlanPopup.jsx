import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { LuPlus } from "react-icons/lu"

const MealPlanPopup = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[35px] h-[35px]">
          <LuPlus
            className="p-[10px] rounded-full bg-black cursor-pointer"
            size={35}
            color="white"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your meal plans</DialogTitle>
          <DialogDescription>
            Select the meal plan you want to add this recipe to.
          </DialogDescription>
        </DialogHeader>
        <Label>Hola, Mundo</Label>
      </DialogContent>
    </Dialog>
  )
}

export default MealPlanPopup
