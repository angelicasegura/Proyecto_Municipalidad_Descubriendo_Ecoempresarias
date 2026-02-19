interface Props {
  direccion: string;
}

export default function EmprendimientoMap({ direccion }: Props) {
  const encodedAddress = encodeURIComponent(direccion);
  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl shadow-md">
      <iframe
        title="Ubicación del emprendimiento"
        src={mapSrc}
        className="h-64 w-full border-0 md:h-80"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}