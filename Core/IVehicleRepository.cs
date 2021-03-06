using System.Collections.Generic;
using System.Threading.Tasks;
using SellMyVehicle.Core.Models;

namespace SellMyVehicle.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         //Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery filter);
         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}