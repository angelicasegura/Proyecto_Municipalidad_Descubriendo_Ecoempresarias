interface Props {
  titulo: string;
  valor: number;
}

export default function CardResumen({ titulo, valor }: Props) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col justify-center">
      <span className="text-gray-500 text-sm">{titulo}</span>
      <span className="text-4xl font-bold text-green-600 mt-2">
        {valor}
      </span>
    </div>
  );
}