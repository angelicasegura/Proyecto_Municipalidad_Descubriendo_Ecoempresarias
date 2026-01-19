interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-t-4 border-t-[#f2a33c]">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-[#0066aa] mb-4 text-xl font-semibold">{title}</h3>
      <p className="text-[#666] text-[0.95rem] leading-relaxed">{description}</p>
    </div>
  )
}