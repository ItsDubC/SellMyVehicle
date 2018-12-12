using System.Threading.Tasks;
using SellMyVehicle.Models;

namespace SellMyVehicle.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id);
    }
}