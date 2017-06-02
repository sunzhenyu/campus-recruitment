using Campus.Recruitment.Enterprise.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace Campus.Recruitment.Enterprise.Helper
{
    public class FileHelper
    {
        public static string[] filetype = new string[] { "image/gif", "image/png", "image/jpg", "image/jpeg", "image/bmp" };
        public static string PostImg(HttpPostedFileBase file, ref string msg, string block = "")
        {
            if (file == null || file.ContentLength <= 0)
            {
                msg = "文件不存在";
                return "";
            }
            if (!filetype.Contains(file.ContentType))
            {
                msg = "不支持的文件格式";
                return "";
            }

            string imgPath = AppSetting.Image_Path + block + "/";
            //rssHost = System.Configuration.ConfigurationManager.AppSettings[rssHost] + block + "/";

            if (!Directory.Exists(imgPath))
            {
                Directory.CreateDirectory(imgPath);
            }

            string fileName = $"{Guid.NewGuid().ToString()}.{file.FileName.Split('.')[1]}";
            string filePath = imgPath + fileName;
            file.SaveAs(filePath);
            return fileName;
        }

        public static void Crop(int width, int height, int x, int y, string block = "", string fileName = "")
        {
            string headIcon = SessionHelper.Instance().GetSessionValue("HeadIcon");
            string imgPath = $"{AppSetting.Image_Path}{block}/{headIcon}";
            string newImgPath = $"{AppSetting.Image_Path}{block}/{fileName}";

            System.Drawing.Rectangle cropArea = new System.Drawing.Rectangle(x, y, width, height); //要截取的区域大小

            //加载图片
            Image img = Image.FromStream(new System.IO.MemoryStream(System.IO.File.ReadAllBytes(imgPath)));

            //定义Bitmap对象
            System.Drawing.Bitmap bmpImage = new System.Drawing.Bitmap(img);

            //进行裁剪
            System.Drawing.Bitmap bmpCrop = bmpImage.Clone(cropArea, bmpImage.PixelFormat);



            string type = headIcon.Split('.')[1].ToLower();

            switch (type)
            {
                case "jpg":
                    bmpCrop.Save(newImgPath, ImageFormat.Jpeg);
                    break;
                case "jpeg":
                    bmpCrop.Save(newImgPath, ImageFormat.Jpeg);
                    break;
                case "png":
                    bmpCrop.Save(newImgPath, ImageFormat.Png);
                    break;
                default:
                    bmpCrop.Save(newImgPath, ImageFormat.Jpeg);
                    break;
            }

            //释放对象
            img.Dispose();
            bmpCrop.Dispose();

        }


        /// <summary> 
        /// 生成缩略图 
        /// </summary> 
        /// <param name="originalFile">源图</param> 
        /// <param name="thumbnailPath">缩略图保存路径</param>
        /// <param name="newName">缩略图保存用文件名</param>  
        /// <param name="width">缩略图宽度</param> 
        /// <param name="height">缩略图高度</param> 
        /// <param name="mode">生成缩略图的方式</param>     
        public static void MakeThumbnail(int width, int height, int x, int y, int ow, int oh, string block = "", string fileName = "")
        {
            string headIcon = SessionHelper.Instance().GetSessionValue("HeadIcon");
            string imgPath = $"{AppSetting.Image_Path}{block}/{headIcon}";
            string newImgPath = $"{AppSetting.Image_Path}{block}/{fileName}";

            Image originalImage = Image.FromFile(imgPath);

            //新建一个bmp图片 
            Image bitmap = new System.Drawing.Bitmap(width, height);

            //新建一个画板 
            Graphics g = System.Drawing.Graphics.FromImage(bitmap);

            //设置高质量插值法 
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

            //设置高质量,低速度呈现平滑程度 
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

            //清空画布并以透明背景色填充 
            g.Clear(Color.Transparent);

            //在指定位置并且按指定大小绘制原图片的指定部分 
            g.DrawImage(originalImage, new Rectangle(0, 0, width, height),
                new Rectangle(x, y, ow, oh),
                GraphicsUnit.Pixel);
            try
            {
                //Stream stream = new MemoryStream();
                //以jpg格式保存缩略图
                //bitmap.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                string type = headIcon.Split('.')[1].ToLower();

                switch (type)
                {
                    case "jpg":
                        bitmap.Save(newImgPath, ImageFormat.Jpeg);
                        break;
                    case "jpeg":
                        bitmap.Save(newImgPath, ImageFormat.Jpeg);
                        break;
                    case "png":
                        bitmap.Save(newImgPath, ImageFormat.Png);
                        break;
                    default:
                        bitmap.Save(newImgPath, ImageFormat.Jpeg);
                        break;
                }
                //bitmap.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                //stream.Dispose();

            }
            catch (System.Exception e)
            {
                throw e;
            }
            finally
            {
                originalImage.Dispose();
                bitmap.Dispose();
                g.Dispose();
            }
        }

    }
}