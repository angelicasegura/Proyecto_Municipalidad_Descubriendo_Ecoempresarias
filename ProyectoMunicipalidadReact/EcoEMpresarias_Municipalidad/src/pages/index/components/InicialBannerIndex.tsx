import { Button } from "../../../components/ui/button"

export function InicialBanner() {
  return (
    <section className="gradient-hero text-white py-24 sm:py-32 text-center">
      <div className="mx-auto max-w-225 px-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4 text-balance">
          Conociendo a Nuestras Ecoempresarias
        </h1>
        <p className="text-xl leading-relaxed mb-8 opacity-95 text-pretty">
          Celebrando a mujeres emprendedoras que transforman sus comunidades con negocios sostenibles
        </p>
        <Button
          size="lg"
          className="bg-[#f2a33c] hover:bg-[#e6932d] text-[#333] font-semibold text-base px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Conoce Más
        </Button>
      </div>
    </section>
  )
}