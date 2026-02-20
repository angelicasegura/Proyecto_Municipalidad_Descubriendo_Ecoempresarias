import React from "react";

interface Props {
  promedio: number;
  total: number;
}

export default function CalificacionPromedio({ promedio, total }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-yellow-500">
        {"⭐".repeat(Math.round(promedio))}
        {"☆".repeat(5 - Math.round(promedio))}
      </div>
      <span className="text-muted-foreground">
        {promedio.toFixed(1)} ({total})
      </span>
    </div>
  );
}