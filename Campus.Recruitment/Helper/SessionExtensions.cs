using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Helper
{
    public static class SessionExtensions
    {
        public static T GetDataFromSession<T>(this HttpSessionStateBase session, string key)
        {
            return (T)session[key];
        }
        public static void SetDataInSession(this HttpSessionStateBase session, string key, object value,int min=20)
        {
            session[key] = value;
            session.Timeout = min;
        }
    }
}