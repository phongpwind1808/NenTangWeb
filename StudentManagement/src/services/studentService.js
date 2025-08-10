const API_BASE_URL = 'http://localhost:3001/api';

// Lấy danh sách sinh viên
export const getStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy dữ liệu sinh viên');
    }
    const data = await response.json();
    return data.students;
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};

// Lưu toàn bộ danh sách sinh viên
export const saveStudents = async (students) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ students }),
    });
    
    if (!response.ok) {
      throw new Error('Lỗi khi lưu dữ liệu sinh viên');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};

// Thêm sinh viên mới
export const addStudent = async (student) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      throw new Error('Lỗi khi thêm sinh viên');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};

// Cập nhật sinh viên
export const updateStudent = async (student) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật sinh viên');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};

// Xóa sinh viên
export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Lỗi khi xóa sinh viên');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
};
