using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socnet.Infrastructure.Service.Interfaces;

namespace socnet.Controllers
{
    public class GroupBaseController: MyBaseController
    {
        protected readonly IGroupService _groupService;

        public GroupBaseController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        protected void SetGroupId(string slug, ref int? groupId)
        {
            if (slug != null)
            {
                var res = _groupService.GetIdBySlug(slug);
                if (res.HasValue)
                {
                    groupId = res.Value;
                }
            }
        }
    }
}
