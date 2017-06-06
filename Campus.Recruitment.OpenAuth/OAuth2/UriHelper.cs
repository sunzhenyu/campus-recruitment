using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Web;
using log4net;

namespace Campus.Recruitment.OpenAuth.OAuth2
{
    public static class UriHelper
    {
        private static ILog log = LogManager.GetLogger(typeof(UriHelper));
        public static Uri BuildUri(string baseUri, NameValueCollection queryParameters, string frangment = "")
        {
            NameValueCollection q = HttpUtility.ParseQueryString(String.Empty);
            q.Add(queryParameters);
            var builder = new UriBuilder(baseUri)
            {
                Query = q.ToString(),
                Fragment = frangment,
            };
            return builder.Uri;
        }

        public static string OAuthPost(string endpoint, NameValueCollection collection)
        {
            NameValueCollection postData = HttpUtility.ParseQueryString(String.Empty);
            postData.Add(collection);

            var webRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";

            using (Stream s = webRequest.GetRequestStream())
            {
                using (var sw = new StreamWriter(s))
                {
                    sw.Write(postData.ToString());
                }
            }

            string response;
            using (WebResponse webResponse = webRequest.GetResponse())
            {
                Stream responseStream = webResponse.GetResponseStream();
                if (responseStream == null)
                {
                    return null;
                }

                using (var reader = new StreamReader(responseStream))
                {
                    response = reader.ReadToEnd();
                }
            }
            return response;
        }

        public static string OAuthPostBearer(string endpoint, NameValueCollection collection, string accessToken)
        {
            NameValueCollection postData = HttpUtility.ParseQueryString(String.Empty);
            postData.Add(collection);

            var webRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            webRequest.Headers.Add("Authorization", "Bearer " + accessToken);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";

            using (Stream s = webRequest.GetRequestStream())
            {
                using (var sw = new StreamWriter(s))
                {
                    sw.Write(postData.ToString());
                }
            }

            string response;
            using (WebResponse webResponse = webRequest.GetResponse())
            {
                Stream responseStream = webResponse.GetResponseStream();
                if (responseStream == null)
                {
                    return null;
                }

                using (var reader = new StreamReader(responseStream))
                {
                    response = reader.ReadToEnd();
                }
            }
            return response;
        }

        public static string OAuthGet(string endpoint, NameValueCollection valueCollection)
        {
            Uri uri = BuildUri(endpoint, valueCollection);
            log.Debug("OAuthGet:" + uri);
            var webRequest = (HttpWebRequest)WebRequest.Create(uri);

            string json;
            using (WebResponse webResponse = webRequest.GetResponse())
            {
                using (Stream stream = webResponse.GetResponseStream())
                {
                    if (stream == null)
                    {
                        return null;
                    }

                    using (var textReader = new StreamReader(stream))
                    {
                        json = textReader.ReadToEnd();
                    }
                }
            }
            return json;
        }

        public static string OAuthGetBearer(string endpoint, NameValueCollection valueCollection, string accessToken)
        {
            Uri uri = BuildUri(endpoint, valueCollection);

            var webRequest = (HttpWebRequest)WebRequest.Create(uri);
            string prefix = "bearer ";
            webRequest.Headers.Add("Authorization", prefix + accessToken);
            string json;
            using (WebResponse webResponse = webRequest.GetResponse())
            {
                using (Stream stream = webResponse.GetResponseStream())
                {
                    if (stream == null)
                    {
                        return null;
                    }

                    using (var textReader = new StreamReader(stream))
                    {
                        json = textReader.ReadToEnd();
                    }
                }
            }
            return json;
        }
    }
}