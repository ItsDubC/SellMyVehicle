using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Models;

namespace SellMyVehicle.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly SellMyVehicleDbContext context;

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);
            else
                return await context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        public VehicleRepository(SellMyVehicleDbContext context)
        {
            this.context = context;
        }
    }
}