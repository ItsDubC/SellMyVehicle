using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Core.Models;

namespace SellMyVehicle.Persistence
{
    public class SellMyVehicleDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public SellMyVehicleDbContext(DbContextOptions<SellMyVehicleDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}