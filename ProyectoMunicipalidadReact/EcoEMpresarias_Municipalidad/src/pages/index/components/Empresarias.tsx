
import {EmpresariasCard} from  "../components/Empresarias-Card";
const empresarias = [
  {
    name: "María González",
    description: "Fundadora de productos de cosmética natural y orgánica.",
    badge: "Cosmética Eco",
    icon: "👩‍💼",
  },
  {
    name: "Carmen López",
    description: "Especialista en agricultura sostenible y cultivos comunitarios.",
    badge: "Agricultura",
    icon: "🌿",
  },
  {
    name: "Ana Rodríguez",
    description: "Emprendedora en reciclaje y economía circular innovadora.",
    badge: "Reciclaje",
    icon: "♻️",
  },
  {
    name: "Elena Torres",
    description: "Creadora de soluciones de energía renovable para comunidades.",
    badge: "Energía",
    icon: "🌍",
  },
  {
    name: "Rosa Martínez",
    description: "Artesana de productos textiles con materiales ecológicos.",
    badge: "Textiles",
    icon: "🎨",
  },
  {
    name: "Laura Sánchez",
    description: "Consultora ambiental y asesora de negocios sostenibles.",
    badge: "Consultoría",
    icon: "🍃",
  },
]

export function Empresarias() {
  return (
    <section id="entrepreneurs" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-300 px-8">
        <h2 className="text-center text-[#0066aa] text-4xl mb-12 font-bold">Conócelas</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {empresarias.map((empresaria) => (
            <EmpresariasCard key={empresaria.name} {...empresaria} />
          ))}
        </div>
      </div>
    </section>
  )
}
