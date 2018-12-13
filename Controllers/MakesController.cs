using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Controllers.Resources;
using SellMyVehicle.Core.Models;
using SellMyVehicle.Persistence;

namespace SellMyVehicle.Controllers
{
    public class MakesController : Controller
    {
        private readonly SellMyVehicleDbContext context;
        private readonly IMapper mapper;

        public MakesController(SellMyVehicleDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            //return await context.Makes.Include(m => m.Models).ToListAsync();
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}