using Campus.Recruitment.Enterprise.Helper;
using Campus.Recruitment.Entities.Condition;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.IBLL;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Controllers
{
    [RoutePrefix("account")]
    public class AccountController : Controller
    {

        private readonly IEnterprisesBLL _enterprisesBll;

        public AccountController(IEnterprisesBLL enterprisesBll)
        {
            _enterprisesBll = enterprisesBll;
        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        [Route("sign-in")]
        public ActionResult SignIn()
        {
            return View();
        }

        /// <summary>
        /// 登录-校验
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        [Route("sign-in-check")]
        public ActionResult SignIn(EnterpriseCondition condition)
        {
            var enterprise = _enterprisesBll.GetEntity(condition.AccountName);
            if (enterprise.Password == MD5Helper.Digest(condition.Password, enterprise.Password_salt))
            {
                Session.SetDataInSession("EnterpriseId", enterprise.Id, 10080);
                Session.SetDataInSession("AccountName", enterprise.Account_name, 10800);
                Session.SetDataInSession("EnterpriseName", enterprise.Name, 10080);
                Session.SetDataInSession("LogoIcon", enterprise.Icon_logo, 10800);
                return RedirectToAction("Index", "Position");
            }
            return View();
        }


        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        [Route("sign-out")]
        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("SignIn");
        }

        /// <summary>
        /// 账号设置
        /// </summary>
        /// <returns></returns>
        [Route("setting")]
        public ActionResult Setting()
        {
            return View();
        }

        [Route("account-setting")]
        public ActionResult AccountSetting(AccountSettingCondition condition) {
            var result = _enterprisesBll.AccountSetting(condition);

            return Json(result);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        [Route("password")]
        public ActionResult Password()
        {
            return View();
        }
        
        [Route("check-old-password")]
        public ActionResult CheckOldPassword(string OldPassword) {
            var enterprise = _enterprisesBll.GetEntity(SessionHelper.Instance().GetSessionValue("AccountName"));
            if (enterprise.Password == MD5Helper.Digest(OldPassword, enterprise.Password_salt))
            {
                return Json(true);
            }
            return Json(false);
        }

        [Route("change-password")]
        public ActionResult ChangePassword(string OldPassword,string NewPassword,string ConfirmPassword) {
            var enterprise = _enterprisesBll.GetEntity(SessionHelper.Instance().GetSessionValue("AccountName"));

            if (NewPassword != ConfirmPassword) return Json(false);

            if (enterprise.Password == MD5Helper.Digest(OldPassword, enterprise.Password_salt))
            {
                string password_salt = Guid.NewGuid().ToString();
                string password = MD5Helper.Digest(NewPassword, password_salt);
                var result = _enterprisesBll.ChangePassword(SessionHelper.Instance().GetSessionValue("EnterpriseId"), password, password_salt);
                return Json(result);
            }

            return Json(false);
        }
        

        /// <summary>
        /// 注册第一步
        /// </summary>
        /// <returns></returns>
        [Route("register-one")]
        public ActionResult RegisterOne()
        {
            return View();
        }

        /// <summary>
        /// 注册第二步
        /// </summary>
        /// <returns></returns>
        [Route("register-two")]
        public ActionResult RegisterTwo(EnterpriseCondition condition)
        {
            if (condition.ValidateCode != Session.GetDataFromSession<string>("ValidateCode"))
            {
                ViewBag.Error = "验证码错误";
                return RedirectToAction("RegisterOne");
            }
            var enterprise = AutoMapper.Mapper.Map<Enterprises>(condition);
            enterprise.Password_salt = Guid.NewGuid().ToString();
            enterprise.Password = MD5Helper.Digest(enterprise.Password, enterprise.Password_salt);
            enterprise.Id = _enterprisesBll.CreateAccount(enterprise);

            if (enterprise.Id.Length > 0)
            {
                ViewBag.Id = enterprise.Id;
                return View();
            }

            return View();
        }

        /// <summary>
        /// 注册第三步
        /// </summary>
        /// <returns></returns>
        [Route("register-three")]
        public ActionResult RegisterThree(EnterpriseCondition condition,HttpPostedFileBase file)
        {
            var enterprise = AutoMapper.Mapper.Map<Enterprises>(condition);
            string msg = "";
            string path = $"/content/upload/e/{enterprise.Id}";

            string fileName = FileHelper.PostImg(file, ref msg, path);
            enterprise.Icon_logo = $"{path}/{fileName}";
            var result = _enterprisesBll.UpdateAccount(enterprise);
            Session.SetDataInSession("EnterpriseId", enterprise.Id, 10800);
            Session.SetDataInSession("AccountName", enterprise.Account_name, 10800);
            Session.SetDataInSession("EnterpriseName", enterprise.Name, 10800);
            Session.SetDataInSession("LogoIcon", enterprise.Icon_logo, 10800);

            ViewBag.Id = enterprise.Id;
            return View();
        }

        /// <summary>
        /// 是否存在账户
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        [Route("is-exist-account-name")]
        public ActionResult IsExistAccountName(string accountName)
        {
            return Json(!_enterprisesBll.IsExistAccount(accountName));
        }

        /// <summary>
        /// 是否存在企业
        /// </summary>
        /// <param name="etpName"></param>
        /// <returns></returns>
        [Route("is-exist-enterprise-name")]
        public ActionResult IsExistEnterpriseName(string etpName) {
            return Json(!_enterprisesBll.IsExistEnterpriseName(etpName));
        }

        [Route("check-code")]
        public ActionResult CheckCode()
        {
            string code = string.Empty;
            byte[] bytes = ValidateCode.CreateValidateGraphic(out code, 4, 80, 30, 20);
            Session.SetDataInSession("ValidateCode", code, 10);
            return File(bytes, @"image/jpeg");
        }

        [Route("check-pic-code")]
        public ActionResult CheckPicCode(string code)
        {
            if (Session.GetDataFromSession<string>("ValidateCode") == code)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 验证码
        /// </summary>
        public class ValidateCode
        {
            /// <summary>
            /// 產生圖形驗證碼。
            /// </summary>
            /// <param name="Code">傳出驗證碼。</param>
            /// <param name="CodeLength">驗證碼字元數。</param>
            /// <param name="Width"></param>
            /// <param name="Height"></param>
            /// <param name="FontSize"></param>
            /// <returns></returns>
            public static byte[] CreateValidateGraphic(out String Code, int CodeLength, int Width, int Height, int FontSize)
            {
                String sCode = String.Empty;
                //顏色列表，用於驗證碼、噪線、噪點
                Color[] oColors ={
             System.Drawing.Color.Black,
             System.Drawing.Color.Red,
             System.Drawing.Color.Blue,
             System.Drawing.Color.Green,
             System.Drawing.Color.Orange,
             System.Drawing.Color.Brown,
             System.Drawing.Color.Brown,
             System.Drawing.Color.DarkBlue
            };
                //字體列表，用於驗證碼
                string[] oFontNames = { "Times New Roman", "MS Mincho", "Book Antiqua", "Gungsuh", "PMingLiU", "Impact" };
                //驗證碼的字元集，去掉了一些容易混淆的字元
                char[] oCharacter = {
       '0','1','2','3','4','5','6','7','8','9'
      // 'A','B','C','D','E','F','G','H','J','K', 'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      };
                Random oRnd = new Random();
                Bitmap oBmp = null;
                Graphics oGraphics = null;
                int N1 = 0;
                System.Drawing.Point oPoint1 = default(System.Drawing.Point);
                System.Drawing.Point oPoint2 = default(System.Drawing.Point);
                string sFontName = null;
                Font oFont = null;
                Color oColor = default(Color);

                //生成驗證碼字串
                for (N1 = 0; N1 <= CodeLength - 1; N1++)
                {
                    sCode += oCharacter[oRnd.Next(oCharacter.Length)];
                }

                oBmp = new Bitmap(Width, Height);
                oGraphics = Graphics.FromImage(oBmp);
                oGraphics.Clear(System.Drawing.Color.White);
                try
                {
                    //for (N1 = 0; N1 <= 4; N1++)
                    //{
                    //    //畫噪線
                    //    //oPoint1.X = oRnd.Next(Width);
                    //    //oPoint1.Y = oRnd.Next(Height);
                    //    //oPoint2.X = oRnd.Next(Width);
                    //    //oPoint2.Y = oRnd.Next(Height);
                    //    //oColor = oColors[oRnd.Next(oColors.Length)];
                    //    //oGraphics.DrawLine(new Pen(oColor), oPoint1, oPoint2);
                    //}

                    float spaceWith = 0, dotX = 0, dotY = 0;
                    if (CodeLength != 0)
                    {
                        spaceWith = (Width - FontSize * CodeLength - 10) / CodeLength;
                    }

                    for (N1 = 0; N1 <= sCode.Length - 1; N1++)
                    {
                        //畫驗證碼字串
                        sFontName = oFontNames[oRnd.Next(oFontNames.Length)];
                        oFont = new Font(sFontName, FontSize, FontStyle.Italic);
                        oColor = oColors[oRnd.Next(oColors.Length)];

                        dotY = (Height - oFont.Height) / 2 + 2;//中心下移2像素
                        dotX = Convert.ToSingle(N1) * FontSize + (N1 + 1) * spaceWith;

                        oGraphics.DrawString(sCode[N1].ToString(), oFont, new SolidBrush(oColor), dotX, dotY);
                    }

                    //for (int i = 0; i <= 30; i++)
                    //{
                    //畫噪點
                    //int x = oRnd.Next(oBmp.Width);
                    //int y = oRnd.Next(oBmp.Height);
                    //Color clr = oColors[oRnd.Next(oColors.Length)];
                    //oBmp.SetPixel(x, y, clr);
                    //}

                    Code = sCode;
                    //保存图片数据
                    MemoryStream stream = new MemoryStream();
                    oBmp.Save(stream, ImageFormat.Jpeg);
                    //输出图片流
                    return stream.ToArray();
                }
                finally
                {
                    oGraphics.Dispose();
                }
            }
        }
    }
}