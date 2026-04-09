using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class KpiNegocio
    {
        public int TotalFacturas { get; set; }
        public decimal VentasTotales { get; set; }
        public int ProductosVendidos { get; set; }
        public decimal TicketPromedio { get; set; }
    }

    public class VentasMensuales
    {
        public int Anio { get; set; }
        public int Mes { get; set; }
        public decimal TotalVentas { get; set; }
    }

    public class TicketPromedioDto
    {
        public int Anio { get; set; }
        public int Mes { get; set; }
        public decimal TicketPromedio { get; set; }
    }

    public class ProductoTop
    {
        public string NombreProducto { get; set; }
        public int TotalVendido { get; set; }
        public decimal Ingresos { get; set; }
    }

    public class ProductoBajo
    {
        public string NombreProducto { get; set; }
        public int TotalVendido { get; set; }
    }

    public class InventarioReporte
    {
        public string NombreProducto { get; set; }
        public int Cantidad_actual { get; set; }
        public int Cantidad_minima { get; set; }
        public string Estado { get; set; }
    }
}
