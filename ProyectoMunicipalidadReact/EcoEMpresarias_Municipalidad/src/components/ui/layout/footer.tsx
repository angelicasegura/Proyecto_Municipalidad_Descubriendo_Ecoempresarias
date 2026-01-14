import {Link} from "react-router-dom"

const footerSections = [
  {
    title: "Sobre Nosotros",
    links: [
      { label: "Misión", href: "/mision" },
      { label: "Visión", href: "/vision" },
      { label: "Historia", href: "/historia" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Capacitación", href: "/capacitacion" },
      { label: "Documentos", href: "/documentos" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "info@ecoempresarias.mx", href: "mailto:info@ecoempresarias.mx" },
      { label: "+52 (555) 555-5555", href: "tel:+525555555555" },
      { label: "Redes Sociales", href: "/redes" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#003d5c] text-white py-12 px-8">
      <div className="mx-auto max-w-300">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#f2a33c] mb-4 text-base font-semibold">{section.title}</h4>
              <ul className="space-y-2 list-none">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[#ccc] hover:text-[#f2a33c] transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/20 text-center">
          <p className="text-[#999] text-[0.9rem]">
            &copy; 2025 Conociendo a Nuestras Ecoempresarias. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
