using System.Collections.Generic;
using System.Threading.Tasks;
using SellMyVehicle.Core.Models;

namespace SellMyVehicle.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}