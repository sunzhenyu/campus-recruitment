using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using System.Data.Entity;
using Campus.Recruitment.IDAL;

namespace Campus.Recruitment.DAL
{

    public class BaseRepository<T> : IDisposable, IBaseRepository<T> where T : class, new()
    {
        protected DbContext db;

        public BaseRepository()
        {
            IDbContextFactory dbFactory = new DbContextFactory();
            db = dbFactory.GetCurrentThreadInstance();
        }

        //查询
        public virtual IQueryable<T> LoadEntities(Expression<Func<T, bool>> whereLambda)
        {
            IQueryable<T> result = db.Set<T>().Where(whereLambda);
            return result;
        }

        //分页查询
        public virtual IQueryable<T> LoadPageEntities<S>(
            Expression<Func<T, bool>> whereLambada,
            Expression<Func<T, S>> orderBy,
            int pageSize,
            int pageIndex,
            out int totalCount,
            bool isASC)
        {
            totalCount = db.Set<T>().Where(whereLambada).Count();
            IQueryable<T> entities = null;
            if (isASC)
            {
                entities = db.Set<T>().Where(whereLambada)
                    .OrderBy(orderBy)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize);
            }
            else
            {
                entities = db.Set<T>().Where(whereLambada)
                    .OrderByDescending(orderBy)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize);
            }
            return entities;
        }

        //查询总数量
        public virtual int Count(Expression<Func<T, bool>> predicate)
        {
            return db.Set<T>().Where(predicate).Count();
        }

        //添加
        public virtual T AddEntity(T entity)
        {
            db.Set<T>().Add(entity);
            db.SaveChanges();
           
            return entity;
        }
        public virtual int AddEntities(params T[] entities)
        {
            db.Set<T>().AddRange(entities);
            int result = db.SaveChanges();
            return result;
        }

        //删除
        public virtual int DeleteEntity(T entity)
        {
            db.Set<T>().Attach(entity);
            db.Entry(entity).State = EntityState.Deleted;
            return -1;
        }

        //批量删除
        public virtual int DeleteBy(Expression<Func<T, bool>> whereLambda)
        {
            var entitiesToDelete = db.Set<T>().Where(whereLambda);
            foreach (var item in entitiesToDelete)
            {
                db.Entry(item).State = EntityState.Deleted;
            }
            return -1;
        }
        //更新
        public virtual T UpdateEntity(T entity)
        {
            if (entity != null)
            {
                db.Set<T>().Attach(entity);
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
            return entity;
        }

        //批量更新
        public virtual int UpdateEntities(params T[] entities)
        {
            int result = 0;
            for (int i = 0; i < entities.Count(); i++)
            {
                db.Set<T>().Attach(entities[i]);
                db.Entry(entities[i]).State = EntityState.Modified;
                result += db.SaveChanges();
            }
            return result;
        }
        public List<T> QuerySql(string sql, params System.Data.SqlClient.SqlParameter[] paras)
        {
            IDbContextFactory dbFactory = new DbContextFactory();
            DbContext db = dbFactory.GetCurrentThreadInstance();
            return db.Database.SqlQuery<T>(sql, paras).ToList();
        }
        //释放EF上下文
        //public void Dispose()
        //{ 
        //    db.Dispose();
        //}
        #region MyRegion
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~BaseRepository()
        {
            Dispose(false);
        } 
        #endregion
    }
}

