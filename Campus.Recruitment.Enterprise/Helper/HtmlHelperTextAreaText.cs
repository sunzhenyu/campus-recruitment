using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Campus.Recruitment.Enterprise.Helper
{
    public static class HtmlHelperTextAreaText
    {
        /// <summary>
        /// 将TextArea文本框的内容生成HTML代码，替换\r\n为'<br/>'
        /// </summary>
        /// <param name="html"></param>
        /// <param name="textAreaText"></param>
        /// <returns></returns>
        public static MvcHtmlString CreateHtmlForTextAreaText(this HtmlHelper html, string textAreaText)
        {
            if (string.IsNullOrEmpty(textAreaText))
            {
                return MvcHtmlString.Empty;
            }
            string s = textAreaText.Replace("\r\n", "<br/>").Replace("\n", "<br/>");
            return MvcHtmlString.Create(s);
        }

        /// <summary>
        /// 将BASE64编码的字符串解码并生成HTML输入到页面，主要用于富文本框
        /// </summary>
        /// <param name="html"></param>
        /// <param name="base64String"></param>
        /// <returns></returns>
        public static MvcHtmlString CreateHtmlFromBase64StringWithUTF8(this HtmlHelper html, string base64String)
        {
            if (string.IsNullOrEmpty(base64String))
            {
                return MvcHtmlString.Empty;
            }
            byte[] bytes = Convert.FromBase64String(base64String);
            string s = System.Text.Encoding.UTF8.GetString(bytes);
            return MvcHtmlString.Create(s);
        }
    }
}