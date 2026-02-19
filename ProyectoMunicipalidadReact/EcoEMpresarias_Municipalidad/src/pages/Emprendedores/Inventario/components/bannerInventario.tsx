

export function BannerInventario() {
    return (
        <section className="gradient-hero text-white py-10 sm:py-14 text-center mb-8">
        <div className="mx-auto max-w-175 px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            ¡Tus Productos en Inventario!
          </h2>
          <p className="text-lg leading-relaxed opacity-95">
            El color de la fila indica si la cantidad actual está por debajo o cerca del mínimo.
          </p>
        </div>
      </section>
    );
}