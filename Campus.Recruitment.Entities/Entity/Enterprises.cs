using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.Entities.Entity
{
    [Table("enterprise")]
    public class Enterprises : BaseEntity
    {
        [Key]
        public string Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string Account_name { get; set; }


        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }


        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }


        /// <summary>
        /// 密码盐
        /// </summary>
        public string Password_salt { get; set; }


        /// <summary>
        /// 企业名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 公司地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 公司logo
        /// </summary>
        public string Icon_logo { get; set; }

        /// <summary>
        /// 所属行业
        /// </summary>
        public string Show_industry { get; set; }


        /// <summary>
        /// 公司规模
        /// </summary>
        public string Scale { get; set; }


        /// <summary>
        /// 公司性质
        /// </summary>
        public string Mode { get; set; }


        /// <summary>
        /// 所在地区
        /// </summary>
        public string Show_city { get; set; }


        /// <summary>
        /// 所在地区
        /// </summary>
        public string City { get; set; }


        /// <summary>
        /// 公司网址
        /// </summary>
        public string Web_site { get; set; }


        /// <summary>
        /// 联系人
        /// </summary>
        public string Contact_man { get; set; }


        /// <summary>
        /// 联系电话-区号
        /// </summary>
        public string Contact_area_code { get; set; }


        /// <summary>
        /// 联系电话-座机
        /// </summary>
        public string Contact_telephone { get; set; }


        /// <summary>
        /// 联系电话-分机
        /// </summary>
        public string Contact_ext { get; set; }


        /// <summary>
        /// 联系电话
        /// </summary>
        public string Contact_mobile { get; set; }

    }
}
