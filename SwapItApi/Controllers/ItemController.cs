using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using SwapItApi.Models;

namespace SwapItApi.Controllers
{
    //[Authorize]
    public class ItemController : Controller
    {
        // GET: Item
        public ActionResult Add()
        {
            if (!Request.IsAjaxRequest())
                return View("_Empty");

            return PartialView();

        }

        [System.Web.Mvc.HttpGet]
        public JsonResult GetProducts()
        {
            var productTypes = new List<ProductType>();
            using (var context = new ApplicationDbContext())
            {
                productTypes.AddRange(context.ProductTypes);
            }
            return Json(productTypes, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Mvc.HttpGet]
        public JsonResult GetSubProducts(int productTypeId)
        {
            var productSubType = new List<ProductSubType>();
            using (var context = new ApplicationDbContext())
            {
                productSubType.AddRange(context.ProductSubTypes.Where(c => c.ProductType.ProductTypeId == productTypeId).ToList());
            }

            return Json(productSubType, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public int AddItem(Item item)
        {
            if (!ModelState.IsValid)
            {
                var reponseMessage = new HttpResponseMessage(HttpStatusCode.BadRequest);
                throw new HttpResponseException(reponseMessage);
            }

            using (var context = new ApplicationDbContext())
            {
                item.ItemAddedBy = System.Web.HttpContext.Current.User.Identity.Name;
                item.ItemPostedOn = DateTime.UtcNow;
                item.ItemSoldOn = DateTime.MaxValue;
                context.Items.Add(item);
                context.SaveChanges();
                return item.ItemId;
            }
        }

        [System.Web.Http.HttpPost]
        public HttpResponseMessage SaveImage(int id)
        {
            if (Request.Files != null)
            {

                using (var context = new ApplicationDbContext())
                {
                    var item = context.Items.FirstOrDefault(i => i.ItemId == id);
                    if (item == null)
                    {
                        return new HttpResponseMessage(HttpStatusCode.NotFound);
                    }
                    if (!Directory.Exists(Server.MapPath("~/UploadedImage")))
                    {
                        Directory.CreateDirectory(Server.MapPath("~/UploadedImage"));
                    }
                    for (var i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];
                        if (file != null)
                        {
                            var storedById = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                            file.SaveAs(Path.Combine(Server.MapPath("~/UploadedImage"), storedById));
                            context.Images.Add(new Image
                            {
                                ImageDisplayName = file.FileName,
                                ImageStoredByName = storedById,
                                Item = item
                            });
                            context.SaveChanges();
                        }
                    }
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [System.Web.Mvc.HttpGet]
        public JsonResult GetProductCondition()
        {
            var productCondition = new List<ProductCondition>();
            using (var context = new ApplicationDbContext())
            {
                productCondition.AddRange(context.ProductConditions);
            }
            return Json(productCondition, JsonRequestBehavior.AllowGet);
        }
    }


}