using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Core;
using SellMyVehicle.Core.Models;
using SellMyVehicle.Extensions;

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

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj) 
        {
            var query = context.Vehicles
                .Include(v => v.Model).ThenInclude(m => m.Make)
                .Include(v => v.Features).ThenInclude(f => f.Feature)
                .AsQueryable();

            if (queryObj.MakeId.HasValue)
                query = query.Where(x => x.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(x => x.Model.Id == queryObj.ModelId.Value);
            
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                //["id"] = v => v.Id,
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            return await query.ToListAsync();
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