import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const STUDENTS_FILE = path.join(__dirname, 'public', 'data', 'students.json');

// Đọc dữ liệu sinh viên
app.get('/api/students', (req, res) => {
  try {
    const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
    const studentsData = JSON.parse(data);
    res.json(studentsData);
  } catch (error) {
    console.error('Lỗi đọc file students.json:', error);
    res.status(500).json({ error: 'Lỗi đọc dữ liệu sinh viên' });
  }
});

// Lưu dữ liệu sinh viên
app.post('/api/students', (req, res) => {
  try {
    const { students } = req.body;
    
    const dataToSave = {
      students: students,
      lastUpdated: new Date().toISOString(),
      totalStudents: students.length
    };
    
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(dataToSave, null, 2));
    
    console.log(`Đã lưu ${students.length} sinh viên vào file JSON`);
    res.json({ 
      success: true, 
      message: 'Lưu dữ liệu thành công',
      totalStudents: students.length 
    });
  } catch (error) {
    console.error('Lỗi ghi file students.json:', error);
    res.status(500).json({ error: 'Lỗi lưu dữ liệu sinh viên' });
  }
});

// Thêm sinh viên mới
app.post('/api/students/add', (req, res) => {
  try {
    const newStudent = req.body;
    
    // Đọc dữ liệu hiện tại
    const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
    const studentsData = JSON.parse(data);
    
    // Tạo ID mới
    const maxId = studentsData.students.length > 0 
      ? Math.max(...studentsData.students.map(s => s.id)) 
      : 0;
    newStudent.id = maxId + 1;
    
    // Thêm sinh viên mới
    studentsData.students.push(newStudent);
    studentsData.totalStudents = studentsData.students.length;
    studentsData.lastUpdated = new Date().toISOString();
    
    // Lưu file
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(studentsData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Thêm sinh viên thành công',
      student: newStudent 
    });
  } catch (error) {
    console.error('Lỗi thêm sinh viên:', error);
    res.status(500).json({ error: 'Lỗi thêm sinh viên' });
  }
});

// Cập nhật sinh viên
app.put('/api/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const updatedStudent = req.body;
    
    // Đọc dữ liệu hiện tại
    const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
    const studentsData = JSON.parse(data);
    
    // Tìm và cập nhật sinh viên
    const studentIndex = studentsData.students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
    }
    
    studentsData.students[studentIndex] = { ...updatedStudent, id: studentId };
    studentsData.lastUpdated = new Date().toISOString();
    
    // Lưu file
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(studentsData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Cập nhật sinh viên thành công',
      student: studentsData.students[studentIndex] 
    });
  } catch (error) {
    console.error('Lỗi cập nhật sinh viên:', error);
    res.status(500).json({ error: 'Lỗi cập nhật sinh viên' });
  }
});

// Xóa sinh viên
app.delete('/api/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    
    // Đọc dữ liệu hiện tại
    const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
    const studentsData = JSON.parse(data);
    
    // Lọc bỏ sinh viên cần xóa
    const initialLength = studentsData.students.length;
    studentsData.students = studentsData.students.filter(s => s.id !== studentId);
    
    if (studentsData.students.length === initialLength) {
      return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
    }
    
    studentsData.totalStudents = studentsData.students.length;
    studentsData.lastUpdated = new Date().toISOString();
    
    // Lưu file
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(studentsData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Xóa sinh viên thành công' 
    });
  } catch (error) {
    console.error('Lỗi xóa sinh viên:', error);
    res.status(500).json({ error: 'Lỗi xóa sinh viên' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📁 File dữ liệu: ${STUDENTS_FILE}`);
});
