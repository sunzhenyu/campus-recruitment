using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using DotNetOpenAuth.AspNet.Clients;
using log4net;
using Newtonsoft.Json;
using Top.Api;
using Top.Api.Request;
using Top.Api.Response;
using System.Runtime.Serialization;

namespace Campus.Recruitment.OpenAuth.OAuth2
{
    /// <summary>
    ///     A DotNetOpenAuth client for logging in to Google using OAuth2.
    ///     Reference: https://developers.google.com/accounts/docs/OAuth2
    /// </summary>
    public class TaobaoClient : OAuth2Client
    {
        private static readonly ILog log = LogManager.GetLogger(typeof (TaobaoClient));

        #region Constants and Fields

        /// <summary>
        ///     The authorization endpoint.
        /// </summary>
        private const string AuthorizationEndpoint = "https://oauth.taobao.com/authorize";

        /// <summary>
        ///     The token endpoint.
        /// </summary>
        private const string TokenEndpoint = "https://oauth.taobao.com/token";

        /// <summary>
        ///     The _app id.
        /// </summary>
        protected readonly string _clientId;

        /// <summary>
        ///     The _app secret.
        /// </summary>
        protected readonly string _clientSecret;

        /// <summary>
        ///     The requested scopes.
        /// </summary>
        private readonly string[] _requestedScopes;

        #endregion

        /// <summary>
        ///     Creates a new Google OAuth2 Client, requesting the default "userinfo.profile" and "userinfo.email" scopes.
        /// </summary>
        /// <param name="clientId">The Google Client Id</param>
        /// <param name="clientSecret">The Google Client Secret</param>
        public TaobaoClient(string clientId, string clientSecret)
            : this(clientId, clientSecret, new[]
                                           {
                                               "email"
                                           })
        {
        }

        /// <summary>
        ///     Creates a new Google OAuth2 client.
        /// </summary>
        /// <param name="clientId">The Google Client Id</param>
        /// <param name="clientSecret">The Google Client Secret</param>
        /// <param name="requestedScopes">One or more requested scopes, passed without the base URI.</param>
        public TaobaoClient(string clientId, string clientSecret, params string[] requestedScopes)
            : base("taobao")
        {
            if (string.IsNullOrWhiteSpace(clientId))
            {
                throw new ArgumentNullException("clientId");
            }

            if (string.IsNullOrWhiteSpace(clientSecret))
            {
                throw new ArgumentNullException("clientSecret");
            }

            if (requestedScopes == null)
            {
                throw new ArgumentNullException("requestedScopes");
            }

            if (requestedScopes.Length == 0)
            {
                throw new ArgumentException("One or more scopes must be requested.", "requestedScopes");
            }

            this._clientId = clientId;
            this._clientSecret = clientSecret;
            this._requestedScopes = requestedScopes;
        }

        protected override Uri GetServiceLoginUrl(Uri returnUrl)
        {
            log.Info("GetServiceLoginUrl");
            IEnumerable<string> scopes = this._requestedScopes;
            string state = string.IsNullOrEmpty(returnUrl.Query) ? string.Empty : returnUrl.Query.Substring(1);

            var collection = new NameValueCollection
                                      {
                                          {"response_type", "code"},
                                          {"client_id", this._clientId},
                                          {"scope", string.Join(" ", scopes)},
                                          {"redirect_uri", returnUrl.GetLeftPart(UriPartial.Path)},
                                          {"state", state},
                                      };
            return UriHelper.BuildUri(AuthorizationEndpoint, collection);
        }

        protected override IDictionary<string, string> GetUserData(string accessToken)
        {
            log.Info("GetUserData");
            const string url = "http://gw.api.taobao.com/router/rest";
            //ɳ�价����http://gw.api.tbsandbox.com/router/rest
            ITopClient myclient = new DefaultTopClient(url, this._clientId, this._clientSecret, "json"); //ʵ����ITopClient��
            var req = new UserSellerGetRequest
                      {
                          Fields = "nick,user_id,type"
                      }; //ʵ��������API��Ӧ��Request��
            UserSellerGetResponse rsp = myclient.Execute(req, accessToken); //ִ��API���󲢽�����ת��Ϊresponse����
            log.Info("response:" + rsp.Body);
            try
            {
                var data = JsonConvert.DeserializeObject<TaobaoResponseData>(rsp.Body);
                var extraData = new Dictionary<string, string>
                                {
                                    {"id", data.user_seller_get_response.user.user_id},
                                    {"name", data.user_seller_get_response.user.nick},
                                };
                return extraData;
            }
            catch (Exception ex)
            {
                log.Error("Deserialize UserData Failed", ex);
                throw;
            }
        }

        protected override string QueryAccessToken(Uri returnUrl, string authorizationCode)
        {
            log.Info("QueryAccessToken(authcode:" + authorizationCode + ")");
            var valueCollection = new NameValueCollection
                                  {
                                      {"grant_type", "authorization_code"},
                                      {"code", authorizationCode},
                                      {"client_id", this._clientId},
                                      {"client_secret", this._clientSecret},
                                      {"redirect_uri", returnUrl.GetLeftPart(UriPartial.Path)},
                                  };
            string json = UriHelper.OAuthPost(TokenEndpoint, valueCollection);
            log.Info("response:" + json);
            if (json == null)
            {
                return null;
            }
            var data = JsonConvert.DeserializeObject<TaobaoQueryAccessTokenResponseData>(json);
            return data.access_token;
        }
        [DataContract]
        [Serializable]
        public class TaobaoQueryAccessTokenResponseData
        {
            [DataMember]
            public string access_token { get; set; }

            [DataMember]
            public string taobao_user_id { get; set; }

            [DataMember]
            public string taobao_user_nick { get; set; }
        }
        [DataContract]
        [Serializable]
        public class TaobaoResponseData
        {
            [DataMember]
            public TaobaoUserSellerGetResponseData user_seller_get_response { get; set; }
        }
        [DataContract]
        [Serializable]
        public class TaobaoUserData
        {
            [DataMember]
            public string user_id { get; set; }

            [DataMember]
            public string nick { get; set; }
        }
        [DataContract]
        [Serializable]
        public class TaobaoUserSellerGetResponseData
        {
            [DataMember]
            public TaobaoUserData user { get; set; }
        }

    }
}