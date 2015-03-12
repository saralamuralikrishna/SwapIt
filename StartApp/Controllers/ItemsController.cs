using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace StartApp.Controllers
{
    [AllowAnonymous]
    public class ItemsController : Controller
    {
        public enum Gender
        {
            Men,
            Women,
            Kid
        }

        public enum ShoeType
        {
            Sports,
            Formal
        }

        public class ItemsViewModel
        {
            public string Name { get; set; }
            public int Id { get; set; }
            public string[] ImageNamesStrings { get; set; }
            public Gender Gender { get; set; }
            public ShoeType ShoeType { get; set; }
        }

        [AllowAnonymous]
        // GET: Items
        public ActionResult Index()
        {
            var items = new List<ItemsViewModel>();
            items.Add(new ItemsViewModel()
            {
                Name = "Name1",
                Id=1,
                ImageNamesStrings = new[] { "Image1","Image2"}
            });
            return View(items);
        }
    }
}