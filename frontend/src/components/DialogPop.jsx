import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"

import { useState } from "react"

const CollectionCard = ({ title, numberOfItems, createdDate }) => {
  return (
    <Card className="transition-all cursor-pointer drop-shadow-sm hover:drop-shadow-md w-ful">
      <CardContent className="flex items-center px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="w-[75px] h-[50px] bg-gray-400 rounded-sm shadow-md">
            <img
              src="https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-full h-full rounded-sm"
            />
          </div>
          <div className="flex flex-col ">
            <p className="font-avenir-medium">{title}</p>
            <p className="text-xs text-gray-500">{numberOfItems} items</p>
            <p className="text-xs text-gray-500">{createdDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const DialogPop = ({ children, title }) => {
  const recipeCollections = [
    {
      title: "Healthy Meals",
      numberOfItems: 5,
      createdDate: "2024-07-10",
    },
    {
      title: "Quick Snacks",
      numberOfItems: 8,
      createdDate: "2024-07-10",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredCollections = recipeCollections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="bg-transparent">
            Add to your {title}
          </DialogTitle>
          <DialogDescription>
            Select where you want to add this recipe to
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className="flex flex-col gap-2">
            {filteredCollections.map((collection, index) => (
              <CollectionCard
                key={index}
                title={collection.title}
                numberOfItems={collection.numberOfItems}
                createdDate={collection.createdDate}
              />
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="rounded-full">Add new</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPop
