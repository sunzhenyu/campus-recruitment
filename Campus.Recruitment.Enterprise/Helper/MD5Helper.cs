using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Campus.Recruitment.Enterprise.Helper
{
    public class MD5Helper
    {
        public static string Hash(string data)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] t = md5.ComputeHash(Encoding.UTF8.GetBytes(data));
            StringBuilder sb = new StringBuilder(32);
            for (int i = 0; i < t.Length; i++)
            {
                sb.Append(t[i].ToString("x").PadLeft(2, '0'));
            }
            return sb.ToString();
        }

        public static string Digest(string data, string salt)
        {
            return Hash(string.Format("{0}####{1}", data, salt));
        }
    }
}