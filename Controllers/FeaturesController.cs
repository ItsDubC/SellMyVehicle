using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SellMyVehicle.Controllers.Resources;
using SellMyVehicle.Core.Models;
using SellMyVehicle.Persistence;

namespace SellMyVehicle.Controllers
{
    //[Route("api/[controller]")]
    public class FeaturesController : Controller
    {
        private readonly SellMyVehicleDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(SellMyVehicleDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures() 
        {
            var features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }
    }
}