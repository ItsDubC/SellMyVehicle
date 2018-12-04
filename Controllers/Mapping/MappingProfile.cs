using AutoMapper;
using SellMyVehicle.Controllers.Resources;
using SellMyVehicle.Models;

namespace SellMyVehicle.Controllers.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
        }
    }
}