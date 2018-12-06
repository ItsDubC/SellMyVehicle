using System;

namespace SellMyVehicle.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public ModelResource Model { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}