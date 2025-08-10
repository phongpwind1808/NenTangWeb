import React, { useState } from 'react';
import '../styles/StudentTable.css';

const StudentTable = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@gmail.com',
      address: '123 Đường Láng, Hà Nội, Việt Nam',
      phone: '(024) 555-1234'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'tranthibinh@gmail.com',
      address: '456 Phố Huế, Hà Nội, Việt Nam',
      phone: '(024) 555-5678'
    },
    {
      id: 3,
      name: 'Lê Hoàng Cường',
      email: 'lehoangcuong@gmail.com',
      address: '789 Kim Mã, Hà Nội, Việt Nam',
      phone: '(024) 555-9012'
    },
    {
      id: 4,
      name: 'Phạm Thu Dung',
      email: 'phamthudung@gmail.com',
      address: '321 Cầu Giấy, Hà Nội, Việt Nam',
      phone: '(024) 555-3456'
    },
    {
      id: 5,
      name: 'Hoàng Minh Đức',
      email: 'hoangminhduc@gmail.com',
      address: '654 Nguyễn Trãi, Hà Nội, Việt Nam',
      phone: '(024) 555-7890'
    }
  ]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleDeleteSelected = () => {
    setStudents(students.filter(student => !selectedStudents.includes(student.id)));
    setSelectedStudents([]);
    setShowDeleteModal(false);
  };

  const totalStudents = 25; // Giả lập tổng số sinh viên
  const studentsPerPage = 5;

  return (
    <div className="student-table-container">
      {/* Header section */}
      <div className="table-header">
        <h2 className="table-title">Quản lý Sinh viên</h2>
        <div className="table-actions">
          <button 
            className="btn-delete"
            onClick={() => setShowDeleteModal(true)}
            disabled={selectedStudents.length === 0}
          >
            🗑️ Xóa
          </button>
          <button className="btn-add">
            ➕ Thêm Sinh viên mới
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedStudents.length === students.length && students.length > 0}
                />
              </th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Điện thoại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <input 
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>
                  <button className="btn-edit">✏️</button>
                  <button className="btn-delete-single">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-wrapper">
        <div className="pagination-info">
          Hiển thị {students.length} trong tổng số {totalStudents} sinh viên
        </div>
        <div className="pagination">
          <button 
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Trước
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button 
            className="page-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
