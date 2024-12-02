import { Button } from "@/components/ui/button"
import { Minus } from 'lucide-react'

interface DeleteButtonProps {
  onClick: () => undefined
}

export default function DeleteButton({ onClick}: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={onClick}
      aria-label="Delete"
      className="rounded-full p-2 h-7 w-7 flex items-center justify-center"
    >
      <Minus strokeWidth={"4px"} className="h-7 w-5" />
    </Button>
  )
}
