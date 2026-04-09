using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    
    public class SectorBaseResponse
    {
        public string Sector { get; set; }
        public decimal TotalVentas { get; set; }
    }
    public class TopSectorResponse : SectorBaseResponse
    {
    }
    public class VentasPorSectorResponse: SectorBaseResponse
    {
        public int CantidadEmprendimientos { get; set; }
    }

    public class CrecimientoResponse
    {
        public int Anio { get; set; }
        public int Mes { get; set; }
        public decimal TotalVentas { get; set; }
    }

    public class ActivosResponse
    {
        public int TotalActivos { get; set; }
    }
}
