import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"

const LogoutDialog = ({ children, isOpen, setDialogOpen }) => {
  const handleClick = (e) => {
    e.stopPropagation()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger onClick={handleClick}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutDialog
