using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
                .ForMember(
                    d => d.PhotoUrl,
                    o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url)
                );
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>()
                .ForMember(
                    dest => dest.DateOfBirth,
                    opt =>
                        opt.MapFrom(src => DateOnly.FromDateTime(DateTime.Parse(src.DateOfBirth)))
                );
        }
    }
}
