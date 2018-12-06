using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Models;

namespace SellMyVehicle.Persistence
{
    public class SellMyVehicleDbContext : DbContext
    {
        public SellMyVehicleDbContext(DbContextOptions<SellMyVehicleDbContext> options) : base(options)
        { }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}