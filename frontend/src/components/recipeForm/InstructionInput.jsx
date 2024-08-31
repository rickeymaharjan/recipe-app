import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"

import { IoTrashOutline } from "react-icons/io5"
import { HiOutlinePlus } from "react-icons/hi"

function InstructionInput({ instructions, setInstructions }) {
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const handleDeleteInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const handleChange = (index, value) => {
    const updatedInstructions = [...instructions]
    updatedInstructions[index] = value
    setInstructions(updatedInstructions)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-gray-500 font-avenir-regular">Instructions</Label>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Instruction"
            value={instruction}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleDeleteInstruction(index)}
            className="text-gray-400"
          >
            <IoTrashOutline size={18} />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={handleAddInstruction}
        className="mt-2 flex items-center gap-1"
      >
        <HiOutlinePlus />
        Add Instruction
      </Button>
    </div>
  )
}

export default InstructionInput
