using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsApi
{
    public class Flight
    {
        public string From { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public string Duration { get; set; } = string.Empty;
        public decimal Economy { get; set; }
        public decimal Business { get; set; }
        public decimal Id { get; set; }
    }
    public class SearchRequest
    {
        public string FromCode { get; set; } = string.Empty;
        public string ToCode { get; set; } = string.Empty;
        public DateTime Departure { get; set; }
        public DateTime Return { get; set; }
    }

    public interface IFlights
    {
        List<Flight> Search(SearchRequest searchRequest);
    }

    public class Flights : IFlights
    {
        public List<Flight> Search(SearchRequest searchRequest)
        {
            return Availability.Search(searchRequest.FromCode, searchRequest.ToCode);
        }
    }

    public static class Availability
    {
        static Dictionary<string, List<Flight>> data = new Dictionary<string, List<Flight>>();

        static Availability()
        {
            data.Add("ESB-ADA", new List<Flight>()
            {
                new Flight(){From = "Ankara, Türkiye (Esenboga Havalimanı - ESB)",
                                To = "Adana, Türkiye (Sakirpasa Havalimanı - ADA)",
                                Start = new DateTime(2023, 1, 1, 9, 0, 0),
                                Duration = "1 sa",
                                Economy = 2048.0M,
                                Business = 5098.0M,
                                },
                new Flight(){From = "Ankara, Türkiye (Esenboga Havalimanı - ESB)",
                                To = "Adana, Türkiye (Sakirpasa Havalimanı - ADA)",
                                Start = new DateTime(2023, 1, 1, 12, 0, 0),
                                Duration = "1 sa",
                                Economy = 2048.0M,
                                Business = 5098.0M,
                                },
            });
            data.Add("ESB-BCN", new List<Flight>()
            {
                new Flight(){From = "Ankara, Türkiye (Esenboga Havalimanı - ESB)",
                                To = "Barselona, İspanya (Airport Havalimanı - BCN)",
                                Start = new DateTime(2023, 1, 1, 9, 0, 0),
                                Duration = "3.5 sa",
                                Economy = 5048.0M,
                                Business = 9098.0M,
                                },
                new Flight(){From = "Ankara, Türkiye (Esenboga Havalimanı - ESB)",
                                To = "Barselona, İspanya (Airport Havalimanı - BCN)",
                                Start = new DateTime(2023, 1, 1, 12, 0, 0),
                                Duration = "3.5 sa",
                                Economy = 6108.10M,
                                Business = 10280.20M,
                                },
            });
        }
        public static List<Flight> Search(string fromCode, string toCode)
        {
            return data.FirstOrDefault(q => q.Key == $"{fromCode}-{toCode}").Value;
        }
    }
}