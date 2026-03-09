interface EmpresariasCardProps {
  name: string;
  ruta_Imagen_Logo: string;
}

export function EmpresariasCard({ name, ruta_Imagen_Logo }: EmpresariasCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-[#f2a33c]">
      
      {/* Imagen como header */}
      <div className="w-full h-100 relative">
        {ruta_Imagen_Logo ? (
        <img
          src={
            
               `https://localhost:7050/api/Images/Buscar/2/${ruta_Imagen_Logo}`
              
          }
          alt={name}
          className="w-full h-full object-cover "
        />
        ) : (
          
          <img
            src={"../../../../public/placeholder.png"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-[#0066aa] text-[1.1rem] font-semibold truncate text-center">
          {name}
        </h3>
      </div>
    </div>
  );
}
