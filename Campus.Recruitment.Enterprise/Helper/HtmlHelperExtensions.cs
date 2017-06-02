using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Campus.Recruitment.Enterprise.Helper
{
    public static class HtmlHelperExtensions
    {
        public static string IsSelected(this HtmlHelper html, string area = null, string controller = null, string action = null, string cssClass = null)
        {

            if (string.IsNullOrEmpty(cssClass))
                cssClass = "active";

            var currentArea = (string)html.ViewContext.RouteData.Values["area"];
            var currentAction = (string)html.ViewContext.RouteData.Values["action"];
            var currentController = (string)html.ViewContext.RouteData.Values["controller"];

            if (string.IsNullOrEmpty(area))
                area = currentArea;

            if (string.IsNullOrEmpty(controller))
                controller = currentController;

            if (string.IsNullOrEmpty(action))
                action = currentAction;

            return area == currentArea && controller == currentController && action == currentAction ?
                cssClass : string.Empty;

            //return controller == currentController && action == currentAction ?
            //    cssClass : string.Empty;
        }


        public static string PageClass(this HtmlHelper html)
        {
            var currentAction = (string)html.ViewContext.RouteData.Values["action"];
            return currentAction;
        }
    }
}
