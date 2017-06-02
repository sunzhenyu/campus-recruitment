using System;
using System.IO;
using System.Drawing;
using Image = System.Drawing.Image;
using ThoughtWorks.QRCode.Codec;
using Campus.Recruitment.Models;

namespace Campus.Recruitment.Helper
{
    public class RQCodeHelper
    {

        //生成代理产品的二维码：返回文件名称
        public static string CreateCodePath(int productId, int invId)
        {
            //EnterprisedId可以生成session  TODO
            //二维码地址
            string weixinUrl = AppSetting.Current_Path + "二维码跳转地址";
            //文件名称
            string fileName = Guid.NewGuid().ToString() + ".jpg";
            //图片存储地址
            string filePath = AppSetting.Image_Path +
                        "/Picture/QRCode/" + fileName;

            //创建用户代理产品数据
            var result = RQCodeHelper.CreateQRCode(weixinUrl, "Byte", 5, 0, "H", filePath, true, System.Threading.Thread.GetDomain().BaseDirectory + "/favicon.ico");

            if (result)
            {
                return fileName;

            }
            return "";
        }
        
        public static byte[] CreateCodeByte(int productId, int invId)
        {
            string weixinProductDetailUrl = AppSetting.Current_Path + "二维码访问地址";
            string fileName = Guid.NewGuid().ToString() + ".jpg";

            string filePath = System.Configuration.ConfigurationManager.AppSettings["DistributedDeploy:FileServerRootPath"].ToString() +
                        "/Picture/Product/DetailQRCode/" + fileName;

            //创建产品详情二维码
            var result = RQCodeHelper.CreateQRCodeByte(weixinProductDetailUrl, "Byte", 5, 0, "L", filePath, false, System.Threading.Thread.GetDomain().BaseDirectory + "/favicon.ico");

            return result;
        }

        public static byte[] CreateCodeByte(string id)
        {
            string jobUrl = $"{AppSetting.Current_Path}/Job/{id}";          
            //创建产品详情二维码
            var result = RQCodeHelper.CreateQRCodeByte(jobUrl, "Byte", 5, 0, "L", "", false, System.Threading.Thread.GetDomain().BaseDirectory + "/favicon.ico");

            return result;
        }

        /// <summary>
        /// 创建二维码
        /// </summary>
        /// <param name="QRString">二维码字符串</param>
        /// <param name="QRCodeEncodeMode">二维码编码(Byte、AlphaNumeric、Numeric)</param>
        /// <param name="QRCodeScale">二维码尺寸(Version为0时，1：26x26，每加1宽和高各加25</param>
        /// <param name="QRCodeVersion">二维码密集度0-40</param>
        /// <param name="QRCodeErrorCorrect">二维码纠错能力(L：7% M：15% Q：25% H：30%)</param>
        /// <param name="filePath">保存路径</param>
        /// <param name="hasLogo">是否有logo(logo尺寸50x50，QRCodeScale>=5，QRCodeErrorCorrect为H级)</param>
        /// <param name="logoFilePath">logo路径</param>
        /// <returns></returns>
        public static bool CreateQRCode(string QRString, string QRCodeEncodeMode, short QRCodeScale, int QRCodeVersion, string QRCodeErrorCorrect, string filePath, bool hasLogo, string logoFilePath)
        {
            bool result = true;

            QRCodeEncoder qrCodeEncoder = new QRCodeEncoder();

            switch (QRCodeEncodeMode)
            {
                case "Byte":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
                    break;
                case "AlphaNumeric":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.ALPHA_NUMERIC;
                    break;
                case "Numeric":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.NUMERIC;
                    break;
                default:
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
                    break;
            }

            qrCodeEncoder.QRCodeScale = QRCodeScale;
            qrCodeEncoder.QRCodeVersion = QRCodeVersion;

            switch (QRCodeErrorCorrect)
            {
                case "L":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.L;
                    break;
                case "M":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.M;
                    break;
                case "Q":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.Q;
                    break;
                case "H":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.H;
                    break;
                default:
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.H;
                    break;
            }

            try
            {
                Image image = qrCodeEncoder.Encode(QRString, System.Text.Encoding.UTF8);
                
                System.IO.FileStream fs = new System.IO.FileStream(filePath, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.Write);
                image.Save(fs, System.Drawing.Imaging.ImageFormat.Jpeg);
                fs.Close();

                if (hasLogo)
                {
                    Image copyImage = System.Drawing.Image.FromFile(logoFilePath);
                    Graphics g = Graphics.FromImage(image);
                    int x = image.Width / 2 - copyImage.Width / 2;
                    int y = image.Height / 2 - copyImage.Height / 2;
                    g.DrawImage(copyImage, new Rectangle(x, y, copyImage.Width, copyImage.Height), 0, 0, copyImage.Width, copyImage.Height, GraphicsUnit.Pixel);
                    g.Dispose();

                    image.Save(filePath);
                    copyImage.Dispose();
                }
                image.Dispose();

            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }


        public static byte[] CreateQRCodeByte(string QRString, string QRCodeEncodeMode, short QRCodeScale, int QRCodeVersion, string QRCodeErrorCorrect, string filePath, bool hasLogo, string logoFilePath) {
            QRCodeEncoder qrCodeEncoder = new QRCodeEncoder();

            switch (QRCodeEncodeMode)
            {
                case "Byte":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
                    break;
                case "AlphaNumeric":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.ALPHA_NUMERIC;
                    break;
                case "Numeric":
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.NUMERIC;
                    break;
                default:
                    qrCodeEncoder.QRCodeEncodeMode = QRCodeEncoder.ENCODE_MODE.BYTE;
                    break;
            }

            qrCodeEncoder.QRCodeScale = QRCodeScale;
            qrCodeEncoder.QRCodeVersion = QRCodeVersion;

            switch (QRCodeErrorCorrect)
            {
                case "L":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.L;
                    break;
                case "M":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.M;
                    break;
                case "Q":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.Q;
                    break;
                case "H":
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.H;
                    break;
                default:
                    qrCodeEncoder.QRCodeErrorCorrect = QRCodeEncoder.ERROR_CORRECTION.H;
                    break;
            }

            Image image = qrCodeEncoder.Encode(QRString, System.Text.Encoding.UTF8);
            try
            {
                if (hasLogo)
                {
                    Image copyImage = System.Drawing.Image.FromFile(logoFilePath);
                    Graphics g = Graphics.FromImage(image);
                    int x = image.Width / 2 - copyImage.Width / 2;
                    int y = image.Height / 2 - copyImage.Height / 2;
                    g.DrawImage(copyImage, new Rectangle(x, y, copyImage.Width, copyImage.Height), 0, 0, copyImage.Width, copyImage.Height, GraphicsUnit.Pixel);
                    g.Dispose();

                    MemoryStream stream = new MemoryStream();
                    image.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);

                    copyImage.Dispose();
                    image.Dispose();
                    return stream.ToArray();
                }
                MemoryStream stream1 = new MemoryStream();
                image.Save(stream1, System.Drawing.Imaging.ImageFormat.Jpeg);
                return stream1.ToArray();
            }
            finally
            {
                image.Dispose();
            }
        }
        
    }
}
