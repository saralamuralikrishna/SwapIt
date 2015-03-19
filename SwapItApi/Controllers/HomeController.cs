using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwapItApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }


        [Authorize]
        public ActionResult Main()
        {
            if (Request.IsAjaxRequest())
                return PartialView();

            return View();
        }
    }
}
