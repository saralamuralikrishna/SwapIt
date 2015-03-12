using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwapItApi.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            if (Request.IsAjaxRequest())
            {
                return PartialView("Login");
            }
            return View("Login");
        }
    }
}