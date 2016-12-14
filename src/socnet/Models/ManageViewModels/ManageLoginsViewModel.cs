using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Authentication;

namespace socnet.Models.ManageViewModels
{
    public class ManageLoginsViewModel
    {

        public IList<AuthenticationDescription> OtherLogins { get; set; }
    }
}
