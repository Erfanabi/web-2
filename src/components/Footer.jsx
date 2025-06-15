import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>درباره ما</h3>
          <p>
            سامانه مدیریت دانشجویان، پلتفرمی برای مدیریت و پیگیری اطلاعات
            دانشجویان
          </p>
        </div>

        <div className="footer-section">
          <h3>تماس با ما</h3>
          <p>📧 ایمیل: info@example.com</p>
          <p>📞 تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
        </div>

        <div className="footer-section">
          <h3>دسترسی سریع</h3>
          <ul>
            <li>
              <a href="/">صفحه اصلی</a>
            </li>
            <li>
              <a href="/students">مدیریت دانشجویان</a>
            </li>
            <li>
              <a href="/profile">پروفایل</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} تمامی حقوق محفوظ است</p>
      </div>
    </footer>
  );
};

export default Footer;
