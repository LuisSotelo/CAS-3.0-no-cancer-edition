using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace CAS.Controllers
{
public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated) { 
                return View();
            }
            else
            {
                return View("~/Views/Account/Login.cshtml");
            }
        }

        public ActionResult About()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.Message = "Your application description page.";
                return View();
            }
            else
            {
                return View("~/Views/Account/Login.cshtml");
            }
        }

        public ActionResult Contact()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.Message = "Your contact page.";
                return View();
            }
            else
            {
                return View("~/Views/Account/Login.cshtml");
            }

        }
    }
}