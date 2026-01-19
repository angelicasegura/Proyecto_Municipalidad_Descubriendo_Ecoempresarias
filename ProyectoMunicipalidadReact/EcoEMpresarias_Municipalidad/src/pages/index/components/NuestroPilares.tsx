import { FeatureCard } from "./InicialBannerIndex-Card"

const features = [
  {
    title: "Sostenibilidad",
    description: "Empresas comprometidas con prácticas ambientales responsables y la protección del planeta.",
    icon: "🌱",
  },
  {
    title: "Empoderamiento",
    description: "Mujeres líderes que impulsan el cambio en sus comunidades y generan oportunidades.",
    icon: "💪",
  },
  {
    title: "Innovación",
    description: "Soluciones creativas que combinan rentabilidad con responsabilidad social y ambiental.",
    icon: "💡",
  },
  {
    title: "Comunidad",
    description: "Red de apoyo que conecta, inspira y fortalece a las ecoempresarias.",
    icon: "🤝",
  },
  {
    title: "Educación",
    description: "Recursos y capacitación para que las mujeres desarrollen sus habilidades empresariales.",
    icon: "📚",
  },
  {
    title: "Impacto",
    description: "Medición y comunicación del impacto positivo en economía, sociedad y medio ambiente.",
    icon: "📈",
  },
]

export function NuestroPilares() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-[#f8f9fa]">
      <div className="mx-auto max-w-300 px-8">
        <h2 className="text-center text-[#0066aa] text-4xl mb-12 font-bold">Nuestros Pilares</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
