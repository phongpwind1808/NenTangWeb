import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">QLSV - Hệ thống Quản lý Sinh viên</h3>
          <p className="footer-description">
            Giải pháp quản lý sinh viên toàn diện cho các trường đại học và cao đẳng
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Liên kết nhanh</h4>
          <ul className="footer-links">
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/students">Danh sách sinh viên</a></li>
            <li><a href="/add-student">Thêm sinh viên</a></li>
            <li><a href="/reports">Báo cáo</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Thông tin liên hệ</h4>
          <ul className="footer-contact">
            <li>📍 175 Tây Sơn, Đống Đa, Hà Nội</li>
            <li>📞 (024) 3852 2201</li>
            <li>✉️ info@tlu.edu.vn</li>
            <li>🌐 www.tlu.edu.vn</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Theo dõi chúng tôi</h4>
          <div className="social-links">
            <a href="#" className="social-link facebook" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link twitter" title="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link linkedin" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-link youtube" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {currentYear} Đại học Thủy Lợi. Tất cả quyền được bảo lưu.</p>
          <div className="footer-bottom-links">
            <a href="#">Chính sách bảo mật</a>
            <span>|</span>
            <a href="#">Điều khoản sử dụng</a>
            <span>|</span>
            <a href="#">Hỗ trợ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
