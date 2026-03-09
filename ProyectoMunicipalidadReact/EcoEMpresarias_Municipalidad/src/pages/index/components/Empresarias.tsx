import type { Emprendedora } from "../../../types/emprendedoresType";
import { EmpresariasCard } from "../components/Empresarias-Card";

interface EmpresariasProps {
  empresarias: Emprendedora[];
}

export function Empresarias({ empresarias }: EmpresariasProps) {
 
  return (
    <section id="entrepreneurs" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-300 px-8">
        <h2 className="text-center text-[#0066aa] text-4xl mb-12 font-bold">Conócelas</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {empresarias.map((empresaria) => (
            <EmpresariasCard
              key={empresaria.nombre}
              name={empresaria.nombre}
              ruta_Imagen_Logo={empresaria.ruta_Imagen_Perfil}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

