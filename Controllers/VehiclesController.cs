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
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        // [HttpGet]
        // public async Task<IEnumerable<SaveVehicleResource>> GetVehicles()
        // {
        //     var vehicles = await context.Vehicles.Include(m => m.Model).ToListAsync();
        //     return mapper.Map<List<Vehicle>, List<SaveVehicleResource>>(vehicles);
        // }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id);

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
            
            Vehicle vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            repository.Add(vehicle);
            await unitOfWork.CompleteAsync();

            // vehicle = await context.Vehicles
            //     .Include(v => v.Features)
            //     .ThenInclude(vf => vf.Feature)
            //     .Include(v => v.Model)
            //     .ThenInclude(m => m.Make)
            //     .SingleOrDefaultAsync(x => x.Id == vehicle.Id);

            vehicle = await repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
            //return Created("api/[controller]", vehicle);
        }

        [HttpPut("{id}")] // /api/vehicles/{id}
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            Vehicle vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();
            else
            {
                mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
                vehicle.LastUpdate = DateTime.Now;
                await unitOfWork.CompleteAsync();

                var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

                return Ok(result);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();
            
            repository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}