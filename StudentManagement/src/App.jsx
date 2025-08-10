import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<div>Trang Chủ</div>} />
            <Route path="/students" element={<div>Danh Sách Sinh Viên</div>} />
            <Route path="/add-student" element={<div>Thêm Sinh Viên</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
