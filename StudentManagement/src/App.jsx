import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import StudentTable from './components/StudentTable';
import './App.css';

// HomePage Component
const HomePage = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/students');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🎓 Hệ thống Quản lý Sinh viên
          </h1>
          <p className="hero-subtitle">
            Giải pháp quản lý sinh viên hiện đại, tiện lợi và hiệu quả
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Sinh viên</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Chuyên ngành</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Hài lòng</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-icon">📊</div>
            <h3>Quản lý thông minh</h3>
            <p>Theo dõi và quản lý sinh viên một cách hiệu quả</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Tính năng nổi bật</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Quản lý sinh viên</h3>
            <p>Thêm, sửa, xóa và tìm kiếm thông tin sinh viên một cách dễ dàng</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Thống kê chi tiết</h3>
            <p>Báo cáo và phân tích dữ liệu sinh viên theo thời gian thực</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Tìm kiếm nhanh</h3>
            <p>Tìm kiếm sinh viên theo tên, email hoặc chuyên ngành</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Giao diện tương thích với mọi thiết bị di động</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Bảo mật cao</h3>
            <p>Dữ liệu được bảo vệ an toàn với hệ thống mã hóa</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Tốc độ nhanh</h3>
            <p>Xử lý dữ liệu nhanh chóng với công nghệ hiện đại</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng bắt đầu?</h2>
          <p>Khám phá ngay các tính năng quản lý sinh viên hiện đại</p>
          <button className="cta-button" onClick={handleCTAClick}>
            Xem danh sách sinh viên →
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/students" element={<StudentTable />} />
              <Route path="/add-student" element={
                <div style={{padding: '20px'}}>
                  <h2>➕ Thêm Sinh viên mới</h2>
                  <p>Form thêm sinh viên sẽ được phát triển...</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
