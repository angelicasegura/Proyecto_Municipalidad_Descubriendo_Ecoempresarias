import { Button } from "../../../components/ui/button"

export function BannerUneteComunidad() {
  return (
    <section id="contact" className="gradient-hero text-white py-16 sm:py-20 text-center">
      <div className="mx-auto max-w-175 px-8">
        <h2 className="text-4xl font-bold tracking-tight mb-4">¡Únete a la Comunidad!</h2>
        <p className="text-lg leading-relaxed mb-8 opacity-95">
          Sé parte de una red de mujeres emprendedoras transformando el mundo con negocios sostenibles.
        </p>
        <Button
          size="lg"
          className="bg-[#FFD177] hover:bg-[#E6BC6B] text-[#333] font-semibold text-base px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Registrarse Ahora
        </Button>
      </div>
    </section>
  )
}