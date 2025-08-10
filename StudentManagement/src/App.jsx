import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/" element={
                <div style={{padding: '40px 20px', textAlign: 'center', minHeight: '400px'}}>
                  <h1 style={{fontSize: '2.5rem', marginBottom: '20px'}}>
                    🎓 Hệ thống Quản lý Sinh viên
                  </h1>
                  <p style={{fontSize: '1.2rem', color: '#666'}}>
                    Chào mừng bạn đến với hệ thống quản lý sinh viên hiện đại và tiện lợi!
                  </p>
                  <div style={{marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <div style={{padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '200px'}}>
                      <h3>📚 Quản lý dễ dàng</h3>
                      <p>Theo dõi thông tin sinh viên một cách hiệu quả</p>
                    </div>
                    <div style={{padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '200px'}}>
                      <h3>📊 Báo cáo chi tiết</h3>
                      <p>Thống kê và phân tích dữ liệu sinh viên</p>
                    </div>
                    <div style={{padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: '200px'}}>
                      <h3>🔒 Bảo mật cao</h3>
                      <p>Dữ liệu được bảo vệ an toàn tuyệt đối</p>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/students" element={<StudentTable />} />
              <Route path="/add-student" element={
                <div style={{padding: '40px 20px', minHeight: '400px'}}>
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
