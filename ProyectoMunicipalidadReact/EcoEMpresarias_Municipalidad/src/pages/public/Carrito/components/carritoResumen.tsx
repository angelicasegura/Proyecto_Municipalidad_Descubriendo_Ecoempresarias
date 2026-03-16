type Props = {
  total: number
}

export default function CarritoResumen({ total }: Props) {

  return (

    <div className="pt-4 border-t mt-4 flex justify-end">

      <div className="text-lg font-semibold">
        Total: ₡{total.toFixed(2)}
      </div>

    </div>

  )

}