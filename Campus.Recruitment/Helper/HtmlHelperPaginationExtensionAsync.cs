﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Campus.Recruitment.Helpers
{
    public static class HtmlHelperPaginationExtensionAsync
    {
        /// <summary>
        /// 呈现普通分页按钮
        /// </summary>
        /// <param name="paginationMode">分页按钮显示模式</param>
        /// <param name="html">被扩展的HtmlHelper</param>
        /// <param name="pagingDataSet">数据集</param>
        /// <param name="numericPagingButtonCount">数字分页按钮显示个数</param>
        /// <returns>分页按钮html代码</returns>
        public static MvcHtmlString PagingButton(this HtmlHelper html, int PageIndex, int PageSize, long TotalRecords, PaginationMode paginationMode = PaginationMode.NumericNextPreviousFirstLast, int numericPagingButtonCount = 5)
        {
            return PagingButton(html, PageIndex, PageSize, TotalRecords, false, null, paginationMode, numericPagingButtonCount);
        }

        /// <summary>
        /// 呈现异步分页按钮
        /// </summary>
        /// <param name="paginationMode">分页按钮显示模式</param>
        /// <param name="html">被扩展的HtmlHelper</param>
        /// <param name="pagingDataSet">数据集</param>
        /// <param name="updateTargetId">异步分页时，被更新的目标元素Id</param>
        /// <param name="numericPagingButtonCount">数字分页按钮显示个数</param>
        /// <returns>分页按钮html代码</returns>
        public static MvcHtmlString AjaxPagingButton(this HtmlHelper html, int PageIndex, int PageSize, long TotalRecords, string updateTargetId, PaginationMode paginationMode = PaginationMode.NumericNextPreviousFirstLast, int numericPagingButtonCount = 5, string ajaxUrl = null)
        {
            return PagingButton(html, PageIndex, PageSize, TotalRecords, true, updateTargetId, paginationMode, numericPagingButtonCount, ajaxUrl);
        }

        /// <summary>
        /// 呈现分页按钮
        /// </summary>
        /// <param name="html">被扩展的HtmlHelper</param>
        /// <param name="pagingDataSet">数据集</param>
        /// <param name="updateTargetId">异步分页时，被更新的目标元素Id</param>
        /// <param name="paginationMode">分页按钮显示模式</param>
        /// <param name="numericPagingButtonCount">数字分页按钮显示个数</param>
        /// <param name="enableAjax">是否使用ajax分页</param>
        /// <returns>分页按钮html代码</returns>
        private static MvcHtmlString PagingButton(this HtmlHelper html, int PageIndex, int PageSize, long TotalRecords, bool enableAjax, string updateTargetId, PaginationMode paginationMode = PaginationMode.NumericNextPreviousFirstLast, int numericPagingButtonCount = 5, string ajaxUrl = null)
        {
            //if (TotalRecords == 0 || PageSize == 0)//不需要分页的返回空字符串
            //    return MvcHtmlString.Empty;

            if (PageSize <= 0)
            {
                return MvcHtmlString.Empty;
            }

            //计算总页数
            int totalPages = (int)(TotalRecords / (long)PageSize);
            if ((TotalRecords % PageSize) > 0)
                totalPages++;

            //未超过一页时不显示分页按钮
            //if (totalPages <= 1)
            //    return MvcHtmlString.Empty;

            bool showFirst = false;
            if (paginationMode == PaginationMode.NextPreviousFirstLast || paginationMode == PaginationMode.NumericNextPreviousFirstLast)
                showFirst = true;

            bool showLast = false;
            if (paginationMode == PaginationMode.NextPreviousFirstLast || paginationMode == PaginationMode.NumericNextPreviousFirstLast)
                showLast = true;

            bool showPrevious = true;
            bool showNext = true;

            bool showNumeric = false;
            if (paginationMode == PaginationMode.NumericNextPrevious || paginationMode == PaginationMode.NumericNextPreviousFirstLast)
                showNumeric = true;

            //显示多少个数字分页按钮
            //int numericPageButtonCount = 10;

            //对pageIndex进行修正
            if (PageIndex < 1)
            {
                PageIndex = 1;
            }
            else if (PageIndex > totalPages)
            {
                PageIndex = totalPages;
            }

            string pagingContainer = "<div id=\"PageTable_paginate\" class=\"dataTables_paginate paging_simple_numbers Pagination\"";
            if (enableAjax)
                pagingContainer += " plugin=\"ajaxPagingButton\" data=\"" + HttpUtility.HtmlEncode(Json.Encode(new { updateTargetId = updateTargetId })) + "\"";
            pagingContainer += "><ul class=\"pagination\">";

            StringBuilder pagingButtonsHtml = new StringBuilder(pagingContainer);

            //构建 "首页"
            if (showFirst)
            {
                //如果不是第一页，且总页数大于数字分页按钮数量
                //if ((PageIndex > 1) && (totalPages > numericPagingButtonCount))
                if (PageIndex > 1)//只要不是第一页，就显示首页
                {
                    pagingButtonsHtml.AppendLine();
                    pagingButtonsHtml.AppendFormat(BuildLink("首页", 1, "homePage"));
                }
                else if (paginationMode == PaginationMode.NextPreviousFirstLast || paginationMode == PaginationMode.NumericNextPreviousFirstLast)
                {
                    pagingButtonsHtml.AppendLine();
                    pagingButtonsHtml.AppendFormat("<li class=\"paginate_button\"><a href=\"javascript:;\" aria-controls=\"PageTable\" class=\"homePage\">{0}</a></li>", "首页");
                }
            }

            //构建 "上一页"
            if (showPrevious)
            {
                pagingButtonsHtml.AppendLine();
                if (PageIndex == 1)
                    pagingButtonsHtml.AppendFormat("<li  class=\"paginate_button previous\" id=\"PageTable_previous\"><a href=\"javascript:;\" aria-controls=\"PageTable\"  class=\"PagePrev\">{0}</a></li>", "上一页");
                else
                    pagingButtonsHtml.AppendFormat(BuildLink("上一页", GetPaging(html, PageIndex - 1, ajaxUrl), "PagePrev"));
            }

            //构建 数字分页部分
            if (showNumeric)
            {
                int startNumericPageIndex;
                if (numericPagingButtonCount > totalPages || PageIndex - (numericPagingButtonCount / 2) <= 0)
                    startNumericPageIndex = 1;
                else if (PageIndex + (numericPagingButtonCount / 2) > totalPages)
                    startNumericPageIndex = totalPages - numericPagingButtonCount + 1;
                else
                    startNumericPageIndex = PageIndex - (numericPagingButtonCount / 2);

                if (startNumericPageIndex < 1)
                    startNumericPageIndex = 1;

                int lastNumericPageIndex = startNumericPageIndex + numericPagingButtonCount - 1;
                if (lastNumericPageIndex > totalPages)
                    lastNumericPageIndex = totalPages;

                for (int i = startNumericPageIndex; i <= lastNumericPageIndex; i++)
                {
                    pagingButtonsHtml.AppendLine();
                    if (PageIndex == i)
                        pagingButtonsHtml.AppendFormat("<li class=\"paginate_button active\"><a href=\"javascript:;\" aria-controls=\"PageTable\"  class=\"PageCur\">{0}</a></li>", i);
                    else
                        pagingButtonsHtml.AppendFormat(BuildLink(i.ToString(), GetPaging(html, i, ajaxUrl)));
                }
                if (startNumericPageIndex + numericPagingButtonCount - 1 < totalPages)
                {
                    pagingButtonsHtml.AppendLine();
                    pagingButtonsHtml.Append("<li class=\"paginate_button \"><span class=\"Ellipsis\"><b>...</b></span></li>");
                }
            }

            if (showNext)
            {
                pagingButtonsHtml.AppendLine();
                if (PageIndex == totalPages)
                    pagingButtonsHtml.AppendFormat("<li class=\"paginate_button next\" id=\"PageTable_next\"><a href=\"javascript:;\" aria-controls=\"PageTable\"   class=\"PageNext\">{0}</a></li>", "下一页");
                else
                    pagingButtonsHtml.AppendFormat(BuildLink("下一页", GetPaging(html, PageIndex + 1, ajaxUrl), "PageNext"));
            }

            if (showLast)
            {
                //如果不是最后一页，且总页数大于数字分页按钮数量
                //if ((PageIndex < totalPages) && (totalPages > numericPagingButtonCount))
                if (PageIndex < totalPages)//不是最后一页，就显示末页
                {
                    pagingButtonsHtml.AppendLine();
                    pagingButtonsHtml.AppendFormat(BuildLink("末页", GetPaging(html, totalPages, ajaxUrl), "lastPage"));
                }
                else if (paginationMode == PaginationMode.NextPreviousFirstLast || paginationMode == PaginationMode.NumericNextPreviousFirstLast)
                {
                    pagingButtonsHtml.AppendLine();
                    pagingButtonsHtml.AppendFormat("<li class=\"paginate_button\"><a href=\"javascript:;\" aria-controls=\"PageTable\"  class=\"lastPage\">{0}</a></li>", "末页");
                }
            }
            pagingButtonsHtml.AppendLine();
            //pagingButtonsHtml.Append("<cite class=\"FormNum\">直接到第<input type=\"text\" maxlength=\"8\" name=\"PageNum\" id=\"PageNum\">页</cite><a href=\"javaScript:;\" class=\"PageNumOK\" id=\"PageNumOK\">确定</a>");
            pagingButtonsHtml.AppendLine();
            //pagingButtonsHtml.AppendFormat("<span>共<b>{0}</b>条，共<b>{1}</b>页</span>", TotalRecords, totalPages);
            pagingButtonsHtml.Append("</div></div>");
            return MvcHtmlString.Create(pagingButtonsHtml.ToString());
        }

        /// <summary>
        /// 构建分页按钮的链接
        /// </summary>
        /// <param name="htmlHelper">被扩展的HtmlHelper</param>
        /// <param name="pageIndex">当前页码</param>
        /// <returns>分页按钮的url字符串</returns>
        public static int GetPaging(this HtmlHelper htmlHelper, int pageIndex, string currentUrl = null)
        {
            object pageIndexObj = null;
            if (htmlHelper.ViewContext.RouteData.Values.TryGetValue("pageIndex", out pageIndexObj))
            {
                return pageIndex;
            }

            if (string.IsNullOrEmpty(currentUrl))
                currentUrl = HttpUtility.HtmlEncode(htmlHelper.ViewContext.HttpContext.Request.RawUrl);


            if (currentUrl.IndexOf("?") == -1)
            {
                return pageIndex;
            }
            else
            {
                if (currentUrl.IndexOf("pageIndex=", StringComparison.InvariantCultureIgnoreCase) == -1)
                    return pageIndex;
                else
                    return pageIndex;
            }
        }

        /// <summary>
        /// 生成带Href的链接
        /// </summary>
        private static string BuildLink(string linkText, int btnEventPageIndex, string cssClassName = "")
        {
            return string.Format("<li class=\"paginate_button\"><a href=\"javascript:;\" aria-controls=\"PageTable\"  onclick=\"Search({0})\" {1}>{2}</a></li>", btnEventPageIndex, string.IsNullOrEmpty(cssClassName) ? string.Empty : string.Format("class=\"{0}\"", cssClassName), linkText);
        }
    }
    /// <summary>
    /// 分页按钮显示模式
    /// </summary>
    public enum PaginationMode
    {
        /// <summary>
        /// 上一页/下一页 模式
        /// </summary>
        NextPrevious,

        /// <summary>
        /// 首页/末页/上一页/下一页 模式
        /// </summary>
        NextPreviousFirstLast,

        /// <summary>
        /// 上一页/下一页 + 数字 模式，例如： 上一页 1 2 3 4 5 下一页
        /// </summary>
        NumericNextPrevious,

        /// <summary>
        /// 首页/末页/上一页/下一页 + 数字 模式，例如： 首页 上一页 1 2 3 4 5 下一页 尾页
        /// </summary>
        NumericNextPreviousFirstLast,
    }
}