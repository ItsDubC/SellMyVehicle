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
        public async Task<IEnumerable<VehicleResource>> GetVehicles()
        {
            var vehicles = await context.Vehicles.Include(m => m.Model).ToListAsync();
            return mapper.Map<List<Vehicle>, List<VehicleResource>>(vehicles);
        }

        [HttpGet("api/vehicles/{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await context.Vehicles.FirstOrDefaultAsync(x => x.Id == id);

            if (vehicle != null)
                return Ok(Mapper.Map<Vehicle, VehicleResource>(vehicle));
            
            return NotFound();
        }
    }
}