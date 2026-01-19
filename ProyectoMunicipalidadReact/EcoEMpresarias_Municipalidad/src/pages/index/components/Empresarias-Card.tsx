import { Badge } from "../../../components/ui/badge"

interface EmpresariasCardProps {
  name: string
  description: string
  badge: string
  icon: string
}

export function EmpresariasCard({ name, description, badge, icon }: EmpresariasCardProps) {
  return (
    <div className="bg-[#f8f9fa] rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform hover:scale-105">
      <div className="gradient-entrepreneur w-full h-62.5 flex items-center justify-center text-white text-5xl">
        {icon}
      </div>
      <div className="p-6">
        <h3 className="text-[#0066aa] mb-2 text-[1.1rem] font-semibold">{name}</h3>
        <p className="text-[#666] text-[0.9rem] leading-relaxed mb-4">{description}</p>
        <Badge className="bg-[#f2a33c] text-[#333] hover:bg-[#f2a33c] px-3 py-1 rounded-full text-[0.8rem] font-semibold">
          {badge}
        </Badge>
      </div>
    </div>
  )
}
