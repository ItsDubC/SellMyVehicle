using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using SellMyVehicle.Controllers.Resources;
using SellMyVehicle.Models;

namespace SellMyVehicle.Controllers.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));

            // API resource to domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                //.ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature { FeatureId = id })));
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove unselected features
                    var removedFeatures = new List<VehicleFeature>();

                    foreach (var f in v.Features)
                        if (!vr.Features.Contains(f.FeatureId))
                            removedFeatures.Add(f);

                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);
                    
                    // Add new features
                    foreach (var fId in vr.Features)
                    {
                        if (!v.Features.Any(f => f.FeatureId == fId))
                            v.Features.Add(new VehicleFeature { FeatureId = fId });

                        // var existingFeature = v.Features.FirstOrDefault(x => x.FeatureId == fId);

                        // if (existingFeature == null)
                        //     v.Features.Add(new VehicleFeature { FeatureId = fId });
                    }
                });
        }
    }
}