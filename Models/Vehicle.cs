using System;
using System.ComponentModel.DataAnnotations;

namespace SellMyVehicle.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        [Required]
        public Model Model { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }
        public DateTime LastUpdate { get; set; }

        public int ModelId { get; set; }

    }
}