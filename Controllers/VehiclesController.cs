using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Controllers.Resources;
using SellMyVehicle.Models;
using SellMyVehicle.Persistence;

namespace SellMyVehicle.Controllers
{
    [Route("api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly SellMyVehicleDbContext context;
        private readonly IMapper mapper;

        public VehiclesController(SellMyVehicleDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<SaveVehicleResource>> GetVehicles()
        {
            var vehicles = await context.Vehicles.Include(m => m.Model).ToListAsync();
            return mapper.Map<List<Vehicle>, List<SaveVehicleResource>>(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (vehicle != null)
                return Ok(mapper.Map<Vehicle, VehicleResource>(vehicle));
            
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            //return Ok(mapper.Map<VehicleResource, Vehicle>(vehicleResource));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            // var model = await context.Models.FindAsync(vehicleResource.ModelId);

            // if (model == null)
            // {
            //     ModelState.AddModelError("modelId", "Invalid modelId");
            //     return BadRequest(ModelState);
            // }
            
            Vehicle vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);

            return Ok(result);
            //return Created("api/[controller]", vehicle);
            
            
        }

        [HttpPut("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            Vehicle vehicle = await context.Vehicles.Include(v => v.Features).FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();
            else
            {
                mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
                vehicle.LastUpdate = DateTime.Now;
                await context.SaveChangesAsync();

                var result = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);

                return Ok(result);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);

            if (vehicle == null)
                return NotFound();
            
            context.Remove(vehicle);
            await context.SaveChangesAsync();

            return Ok(id);
        }
    }
}