// File data.js - Dữ liệu giả lập CSDL cho hệ thống quản lý giao dịch
// Trường Đại học Thủy lợi

const transactionsData = [
    {
        id: 1,
        year: "1702",
        customer: "Võ Hoài An",
        employee: "Máy Thưa Anh",
        amount: "230,000",
        date: "06 Tháng 5 2024 8:00",
        rawAmount: 230000
    },
    {
        id: 2,
        year: "1599", 
        customer: "Hoàng Thị Tháng",
        employee: "Nguyễn Văn Hùng",
        amount: "600,000",
        date: "06 Tháng 5 2024 9:03",
        rawAmount: 600000
    },
    {
        id: 3,
        year: "1235",
        customer: "Nguyễn Hải Quang", 
        employee: "Nguyễn Văn Hùng",
        amount: "934,000",
        date: "06 Tháng 5 2024 9:16",
        rawAmount: 934000
    },
    {
        id: 4,
        year: "1677",
        customer: "Huỳnh Văn Nam",
        employee: "Máy Thưa Anh", 
        amount: "150,000",
        date: "06 Tháng 5 2024 9:20",
        rawAmount: 150000
    },
    {
        id: 5,
        year: "1494",
        customer: "Nguyễn Hồng Minh",
        employee: "Máy Thưa Anh",
        amount: "254,000", 
        date: "06 Tháng 5 2024 9:24",
        rawAmount: 254000
    },
    {
        id: 6,
        year: "1888",
        customer: "Trần Thị Mai Lan",
        employee: "Lê Văn Đức",
        amount: "1,200,000",
        date: "07 Tháng 5 2024 10:15",
        rawAmount: 1200000
    },
    {
        id: 7,
        year: "1345",
        customer: "Phạm Minh Tuấn",
        employee: "Hoàng Thị Nga",
        amount: "850,000",
        date: "07 Tháng 5 2024 11:30",
        rawAmount: 850000
    },
    {
        id: 8,
        year: "1567",
        customer: "Ngô Thị Bích Ngọc",
        employee: "Đặng Văn Hải",
        amount: "475,000",
        date: "07 Tháng 5 2024 14:20",
        rawAmount: 475000
    }
];

// Hàm lấy tất cả giao dịch
function getAllTransactions() {
    return transactionsData;
}

// Hàm thêm giao dịch mới
function addTransaction(transaction) {
    const newId = Math.max(...transactionsData.map(t => t.id)) + 1;
    const newTransaction = {
        id: newId,
        ...transaction
    };
    transactionsData.push(newTransaction);
    return newTransaction;
}

// Hàm xóa giao dịch theo ID
function deleteTransaction(id) {
    const index = transactionsData.findIndex(t => t.id === id);
    if (index !== -1) {
        return transactionsData.splice(index, 1)[0];
    }
    return null;
}

// Hàm cập nhật giao dịch
function updateTransaction(id, updatedData) {
    const index = transactionsData.findIndex(t => t.id === id);
    if (index !== -1) {
        transactionsData[index] = { ...transactionsData[index], ...updatedData };
        return transactionsData[index];
    }
    return null;
}

// Hàm tìm kiếm giao dịch
function searchTransactions(query) {
    return transactionsData.filter(transaction => 
        transaction.customer.toLowerCase().includes(query.toLowerCase()) ||
        transaction.employee.toLowerCase().includes(query.toLowerCase()) ||
        transaction.year.includes(query) ||
        transaction.amount.includes(query) ||
        transaction.date.toLowerCase().includes(query.toLowerCase())
    );
}

// Hàm lọc giao dịch theo khoảng thời gian
function filterTransactionsByDate(startDate, endDate) {
    return transactionsData.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
}

// Hàm thống kê tổng số tiền
function getTotalAmount() {
    return transactionsData.reduce((total, transaction) => {
        return total + (transaction.rawAmount || 0);
    }, 0);
}

// Hàm lấy giao dịch theo khách hàng
function getTransactionsByCustomer(customerName) {
    return transactionsData.filter(transaction => 
        transaction.customer.toLowerCase().includes(customerName.toLowerCase())
    );
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        transactionsData,
        getAllTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        searchTransactions,
        filterTransactionsByDate,
        getTotalAmount,
        getTransactionsByCustomer
    };
}