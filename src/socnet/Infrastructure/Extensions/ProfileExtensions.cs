﻿using socnet.Models;
using socnet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socnet.Infrastructure.Extensions
{
    public static class ProfileExtensions
    {
        public static ProfileDTO ToDto(this Profile profile)
        {
            if (profile == null) return null;
            return new ProfileDTO
            {
                AvatarSrc = profile.AvatarSrc,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                Email = profile.Email,
                ProfileId = profile.ProfileId,
                University = profile.University
            };
        }
    }
}
