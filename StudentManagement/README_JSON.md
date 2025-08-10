# Hệ thống Quản lý Sinh viên với JSON File Storage

## 🎯 Mô tả
Ứng dụng React quản lý sinh viên với dữ liệu được lưu trữ trong file JSON thông qua API Express.

## 📁 Cấu trúc dữ liệu
Dữ liệu được lưu trong file: `public/data/students.json`

```json
{
  "students": [
    {
      "id": 1,
      "name": "Nguyễn Văn An",
      "email": "nguyenvanan@gmail.com",
      "address": "123 Đường Láng, Hà Nội, Việt Nam",
      "phone": "(024) 555-1234",
      "major": "Công nghệ thông tin",
      "class": "CNTT-K62",
      "birthDate": "15/03/2004",
      "gender": "Nam",
      "gpa": 3.8,
      "status": "Đang học"
    }
  ],
  "lastUpdated": "2024-01-10T00:00:00.000Z",
  "totalStudents": 5
}
```

## 🚀 Cách chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy cả server và client
```bash
npm start
```
Hoặc chạy riêng lẻ:

**Chạy API server (Port 3001):**
```bash
npm run server
```

**Chạy React app (Port 5174):**
```bash
npm run dev
```

### 3. Truy cập ứng dụng
- Frontend: http://localhost:5174
- API Server: http://localhost:3001

## 🔧 API Endpoints

### GET /api/students
Lấy danh sách sinh viên từ file JSON

### POST /api/students
Lưu toàn bộ danh sách sinh viên vào file JSON

### POST /api/students/add
Thêm sinh viên mới vào file JSON

### PUT /api/students/:id
Cập nhật thông tin sinh viên theo ID

### DELETE /api/students/:id
Xóa sinh viên theo ID

## ✨ Tính năng

### Frontend (React)
- ✅ Xem danh sách sinh viên
- ✅ Thêm sinh viên mới (Modal dialog)
- ✅ Sửa thông tin sinh viên
- ✅ Xóa sinh viên (đơn lẻ hoặc hàng loạt)
- ✅ Tìm kiếm theo tên/email
- ✅ Lọc theo chuyên ngành
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

### Backend (Express)
- ✅ RESTful API
- ✅ File JSON storage
- ✅ CORS enabled
- ✅ Error handling
- ✅ Auto ID generation
- ✅ Data validation

## 📋 Yêu cầu hệ thống
- Node.js 16+
- npm hoặc yarn
- Browser hiện đại (Chrome, Firefox, Safari, Edge)

## 🗂️ File quan trọng
- `public/data/students.json` - File lưu trữ dữ liệu
- `server.js` - API server Express
- `src/services/studentService.js` - Service gọi API
- `src/components/StudentTable.jsx` - Component chính
- `package.json` - Dependencies và scripts

## 🔄 Luồng hoạt động
1. User tương tác với React frontend
2. Frontend gọi API qua studentService
3. Express server xử lý request
4. Server đọc/ghi file JSON
5. Trả về response cho frontend
6. Frontend cập nhật UI

## 🛠️ Troubleshooting

### Lỗi không kết nối được API
- Kiểm tra server đang chạy trên port 3001
- Kiểm tra CORS configuration
- Kiểm tra firewall/antivirus

### Lỗi file JSON
- Kiểm tra file `public/data/students.json` tồn tại
- Kiểm tra quyền read/write file
- Kiểm tra định dạng JSON hợp lệ

### Lỗi dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```
