using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CAS.Controllers
{
    public class TrabajoSocialController : Controller
    {
        // GET: TrabajoSocial
        public ActionResult Index()
        {
            DateTime fecha = DateTime.Now;
            Console.WriteLine(fecha);
            return View();
        }
        public ActionResult NewPersona()
        {
            return View();
        }

    }
}
