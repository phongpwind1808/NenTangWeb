import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Tìm kiếm:', searchTerm);
      // Thêm logic tìm kiếm ở đây
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="navbar-content">
          <Link className="navbar-brand" to="/">
            QLSV
          </Link>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`} 
                to="/students"
              >
                Sinh viên
              </Link>
            </li>
          </ul>
          
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm kiếm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="search-button"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
