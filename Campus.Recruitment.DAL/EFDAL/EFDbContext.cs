using Campus.Recruitment.Entities;
using Campus.Recruitment.Entities.Entity;
using Campus.Recruitment.Entities.Entity.Customers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Campus.Recruitment.DAL
{
    public class EFDbContext : DbContext
    {
        public EFDbContext() : base("name=MySqlConn") { }

        //一张表对应一个集合

        /// <summary>
        /// 意见反馈
        /// </summary>
        public DbSet<Feedback> Feedbacks { get; set; }

        /// <summary>
        /// 学生表
        /// </summary>
        public DbSet<Customer> Customers { get; set; }

        
        public DbSet<CustomerBase> CustomerBases { get; set; }

        public DbSet<CustomerCertificate> CustomerCertificates { get; set; }

        public DbSet<CustomerEducation> CustomerEducations { get; set; }

        public DbSet<CustomerExperience> CustomerExperience { get; set; }

        public DbSet<CustomerIntramuralJob> CustomerIntramuralJob { get; set; }

        public DbSet<CustomerIntramuralReward> CustomerIntramuralReward { get; set; }

        public DbSet<CustomerItSkill> CustomerItSkill { get; set; }

        public DbSet<CustomerLanguage> CustomerLanguage { get; set; }

        public DbSet<CustomerProject> CustomerProject { get; set; }

        public DbSet<SysDictionary> SysDictionary { get; set; }

        public DbSet<Position> Position { get; set; }

        public DbSet<Enterprises> Enterprises { get; set; }

        public DbSet<PositionApply> PositionApply { get; set; }

        public DbSet<PositionCollect> PositionCollect { get; set; }

        public DbSet<PositionFire> PositionFire { get; set; }

        public DbSet<NotificationInterview> NotificationInterview { get; set; }

        public DbSet<PositionInvitation> PositionInvitation { get; set; }
    }
}
