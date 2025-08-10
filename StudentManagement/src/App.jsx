import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={
              <div style={{padding: '20px', textAlign: 'center'}}>
                <h1>🎓 Hệ thống Quản lý Sinh viên</h1>
                <p>Chào mừng bạn đến với hệ thống quản lý sinh viên!</p>
              </div>
            } />
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
    </Router>
  );
}

export default App;
