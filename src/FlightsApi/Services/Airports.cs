using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsApi
{
    public class Airport
    {
        public string Code { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
    }
    public interface IAirports
    {
        List<Airport> List();
    }

    public class Airports : IAirports
    {
        public List<Airport> List()
        {

            var list = new List<Airport>();
            list.Add(new Airport() { Code = "ESB", Name = "Ankara, Türkiye (Esenboga Havalimanı - ESB)" });
            list.Add(new Airport() { Code = "ADA", Name = "Adana, Türkiye (Sakirpasa Havalimanı - ADA)" });
            list.Add(new Airport() { Code = "BCN", Name = "Barselona, İspanya (Airport Havalimanı - BCN)" });
            list.Add(new Airport() { Code = "VIE", Name = "Viyana, Avusturya (Vienna Intl Havalimanı - VIE)" });
            list.Add(new Airport() { Code = "ZRH", Name = "Zürih, İsviçre (Zurich Airport Havalimanı - ZRH)" });
            return list;
        }
    }
}