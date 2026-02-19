import { Button } from "../../../../components/ui/button"
import { Minus, Plus } from "lucide-react"
interface Props {
  cantidad: number
  setCantidad: React.Dispatch<React.SetStateAction<number>>
}

export default function ProductoCantidad({ cantidad, setCantidad }: Props) {
  const aumentar = () => setCantidad((prev) => prev + 1)

  const disminuir = () =>
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Cantidad:</span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={disminuir}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-10 text-center text-lg font-medium">
          {cantidad}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={aumentar}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}