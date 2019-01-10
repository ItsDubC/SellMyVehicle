using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Core;
using SellMyVehicle.Core.Models;

namespace SellMyVehicle.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly SellMyVehicleDbContext context;

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
        }

        public PhotoRepository(SellMyVehicleDbContext context)
        {
            this.context = context;
        }
    }
}