using System.Web.Mvc;

namespace SwapItApi.Controllers
{
    public class ConfirmEmailController : Controller
    {
        // GET: ConfirmEmail
        public ActionResult Index()
        {
            if (Request.IsAjaxRequest())
                return PartialView();
            return View();
        }

        public ActionResult Success()
        {
            if (Request.IsAjaxRequest())
                return PartialView();
            return View();
        }
    }
}