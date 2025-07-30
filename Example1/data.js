// Database simulation with JSON data
// Employee management system data

const employeesData = [
    {
        id: 1,
        name: "Thomas Hardy",
        email: "thomashardy@mail.com",
        address: "89 Chiaroscuro Rd, Portland, USA",
        phone: "0171555222"
    },
    {
        id: 2,
        name: "Dominique Perrier",
        email: "dominiqueperrier@mail.com",
        address: "Obere Str. 57, Berlin, Germany",
        phone: "0313555735"
    },
    {
        id: 3,
        name: "Maria Anders",
        email: "mariaanders@mail.com",
        address: "25, rue Lauriston, Paris, France",
        phone: "0503555931"
    },
    {
        id: 4,
        name: "Fran Wilson",
        email: "franwilson@mail.com",
        address: "C/ Araquil, 67, Madrid, Spain",
        phone: "0204619731"
    },
    {
        id: 5,
        name: "Martin Blank",
        email: "martinblank@mail.com",
        address: "Via Monte Bianco 34, Turin, Italy",
        phone: "0480631097"
    },
    {
        id: 6,
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        address: "123 Nguyễn Trãi, Hà Nội, Việt Nam",
        phone: "0987654321"
    },
    {
        id: 7,
        name: "Trần Thị Bình",
        email: "tranthibinh@yahoo.com",
        address: "456 Lê Lợi, TP.HCM, Việt Nam",
        phone: "0912345678"
    },
    {
        id: 8,
        name: "Lê Minh Cường",
        email: "leminhcuong@hotmail.com",
        address: "789 Trần Hưng Đạo, Đà Nẵng, Việt Nam",
        phone: "0934567890"
    }
];

// Function to get all employees
function getAllEmployees() {
    return employeesData;
}

// Function to add new employee
function addEmployee(employee) {
    const newEmployee = {
        id: employeesData.length + 1,
        ...employee
    };
    employeesData.push(newEmployee);
    return newEmployee;
}

// Function to delete employee by id
function deleteEmployee(id) {
    const index = employeesData.findIndex(emp => emp.id === id);
    if (index !== -1) {
        return employeesData.splice(index, 1)[0];
    }
    return null;
}

// Function to update employee
function updateEmployee(id, updatedData) {
    const index = employeesData.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employeesData[index] = { ...employeesData[index], ...updatedData };
        return employeesData[index];
    }
    return null;
}

// Function to search employees by name or email
function searchEmployees(query) {
    return employeesData.filter(emp => 
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase())
    );
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        employeesData,
        getAllEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
        searchEmployees
    };
}