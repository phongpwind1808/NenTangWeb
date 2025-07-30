// Sample data for the table
const sampleData = [
    {
        id: 1,
        year: "1702",
        customer: "Võ Hoài An",
        brand: "Máy Thưa Anh",
        amount: "230,000",
        date: "06 Tháng 5 2024 8:00"
    },
    {
        id: 2,
        year: "1599",
        customer: "Hoàng Thị Tháng",
        brand: "Nguyễn Văn Hùng",
        amount: "600,000",
        date: "06 Tháng 5 2024 9:03"
    },
    {
        id: 3,
        year: "1235",
        customer: "Nguyễn Hải Quang",
        brand: "Nguyễn Văn Hùng",
        amount: "934,000",
        date: "06 Tháng 5 2024 9:16"
    },
    {
        id: 4,
        year: "1677",
        customer: "Huỳnh Văn Nam",
        brand: "Máy Thưa Anh",
        amount: "150,000",
        date: "06 Tháng 5 2024 9:20"
    },
    {
        id: 5,
        year: "1494",
        customer: "Nguyễn Hồng Minh",
        brand: "Máy Thưa Anh",
        amount: "254,000",
        date: "06 Tháng 5 2024 9:24"
    },
    {
        id: 6,
        year: "1388",
        customer: "Lê Thị Mai",
        brand: "Nguyễn Văn Hùng",
        amount: "432,000",
        date: "06 Tháng 5 2024 10:15"
    },
    {
        id: 7,
        year: "1566",
        customer: "Trần Minh Đức",
        brand: "Máy Thưa Anh",
        amount: "678,000",
        date: "06 Tháng 5 2024 11:30"
    }
];

let currentData = [...sampleData];
let selectedRows = new Set();

// DOM elements
const tableBody = document.getElementById('tableBody');
const deleteButton = document.getElementById('deleteSelected');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');
const addButton = document.querySelector('.btn-add');
const exportControl = document.querySelector('.export-control');
const resultSelect = document.querySelector('.result-select');

// Initialize the application
// (Moved to bottom of file)

// Render table with current data
function renderTable() {
    tableBody.innerHTML = '';
    
    currentData.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;
        
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${item.id}"></td>
            <td>
                <button class="btn-action btn-view" onclick="viewRecord(${item.id})" title="Xem chi tiết">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-edit" onclick="editRecord(${item.id})" title="Chỉnh sửa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" onclick="deleteRecord(${item.id})" title="Xóa">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            <td>${item.year}</td>
            <td>${item.customer}</td>
            <td>${item.brand}</td>
            <td>${item.amount}</td>
            <td>${item.date}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateDeleteButtonState();
}

// Setup event listeners
function setupEventListeners() {
    // Checkbox handling
    tableBody.addEventListener('change', function(e) {
        if (e.target.classList.contains('row-checkbox')) {
            const id = parseInt(e.target.dataset.id);
            if (e.target.checked) {
                selectedRows.add(id);
            } else {
                selectedRows.delete(id);
            }
            updateDeleteButtonState();
        }
    });
    
    // Delete selected records
    deleteButton.addEventListener('click', deleteSelectedRecords);
    
    // Search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            currentData = [...sampleData];
            renderTable();
        }
    });
    
    // Add button functionality
    addButton.addEventListener('click', function() {
        alert('Tính năng thêm mới sẽ được cài đặt sau!');
    });
    
    // Export functionality
    exportControl.addEventListener('click', function() {
        exportData();
    });
    
    // Result per page functionality
    resultSelect.addEventListener('change', function() {
        const resultsPerPage = parseInt(this.value);
        // This would typically trigger pagination update
        console.log(`Hiển thị ${resultsPerPage} kết quả mỗi trang`);
        alert(`Đã chọn hiển thị ${resultsPerPage} kết quả mỗi trang`);
    });
}

// Update delete button state
function updateDeleteButtonState() {
    const hasSelection = selectedRows.size > 0;
    deleteButton.disabled = !hasSelection;
    deleteButton.style.opacity = hasSelection ? '1' : '0.6';
    deleteButton.style.cursor = hasSelection ? 'pointer' : 'not-allowed';
    
    // Update select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = selectedRows.size === currentData.length && currentData.length > 0;
        selectAllCheckbox.indeterminate = selectedRows.size > 0 && selectedRows.size < currentData.length;
    }
}

// Perform search
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        currentData = [...sampleData];
        renderTable();
        return;
    }
    
    currentData = sampleData.filter(item => {
        return item.customer.toLowerCase().includes(query) ||
               item.brand.toLowerCase().includes(query) ||
               item.year.includes(query) ||
               item.amount.includes(query) ||
               item.date.toLowerCase().includes(query);
    });
    
    selectedRows.clear();
    renderTable();
}

// Delete selected records
function deleteSelectedRecords() {
    if (selectedRows.size === 0) {
        alert('Vui lòng chọn ít nhất một bản ghi để xóa.');
        return;
    }
    
    const confirmMessage = `Bạn có chắc chắn muốn xóa ${selectedRows.size} bản ghi đã chọn?`;
    if (confirm(confirmMessage)) {
        // Remove selected items from both arrays
        currentData = currentData.filter(item => !selectedRows.has(item.id));
        sampleData.splice(0, sampleData.length, ...sampleData.filter(item => !selectedRows.has(item.id)));
        
        selectedRows.clear();
        renderTable();
        
        alert(`Đã xóa thành công ${selectedRows.size} bản ghi.`);
    }
}

// Action button functions
function viewRecord(id) {
    const record = currentData.find(item => item.id === id);
    if (record) {
        alert(`Xem chi tiết:\nNăm: ${record.year}\nKhách hàng: ${record.customer}\nNhãn hiệu: ${record.brand}\nSố tiền: ${record.amount}\nNgày mua: ${record.date}`);
    }
}

function editRecord(id) {
    const record = currentData.find(item => item.id === id);
    if (record) {
        const newCustomer = prompt('Nhập tên khách hàng mới:', record.customer);
        if (newCustomer && newCustomer.trim() !== '') {
            record.customer = newCustomer.trim();
            
            // Update in original data too
            const originalRecord = sampleData.find(item => item.id === id);
            if (originalRecord) {
                originalRecord.customer = newCustomer.trim();
            }
            
            renderTable();
            alert('Cập nhật thành công!');
        }
    }
}

function deleteRecord(id) {
    const record = currentData.find(item => item.id === id);
    if (record) {
        const confirmMessage = `Bạn có chắc chắn muốn xóa bản ghi của "${record.customer}"?`;
        if (confirm(confirmMessage)) {
            currentData = currentData.filter(item => item.id !== id);
            sampleData.splice(0, sampleData.length, ...sampleData.filter(item => item.id !== id));
            selectedRows.delete(id);
            renderTable();
            alert('Xóa bản ghi thành công!');
        }
    }
}

// Select all functionality (can be added to header checkbox)
function toggleSelectAll() {
    const allCheckboxes = document.querySelectorAll('.row-checkbox');
    const allSelected = selectedRows.size === currentData.length;
    
    if (allSelected) {
        // Unselect all
        selectedRows.clear();
        allCheckboxes.forEach(cb => cb.checked = false);
    } else {
        // Select all
        selectedRows.clear();
        currentData.forEach(item => selectedRows.add(item.id));
        allCheckboxes.forEach(cb => cb.checked = true);
    }
    
    updateDeleteButtonState();
}

// Pagination functions (can be enhanced)
function goToPage(page) {
    // This is a placeholder for pagination functionality
    console.log(`Going to page ${page}`);
    // Update pagination UI
    document.querySelectorAll('.page-link, .page-active').forEach(el => {
        el.classList.remove('page-active');
        el.classList.add('page-link');
    });
    
    // Set active page
    const pageElements = document.querySelectorAll('.pagination-controls span, .pagination-controls a');
    pageElements.forEach(el => {
        if (el.textContent === page.toString()) {
            el.classList.remove('page-link');
            el.classList.add('page-active');
        }
    });
}

// Export data (bonus feature)
function exportData() {
    if (currentData.length === 0) {
        alert('Không có dữ liệu để xuất!');
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Năm đăng,Khách hàng,Nhãn hiệu,Số tiền,Ngày mua\n"
        + currentData.map(item => 
            `${item.year},"${item.customer}","${item.brand}","${item.amount}","${item.date}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "danh_sach_giao_dich.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Đã xuất ${currentData.length} bản ghi ra file CSV!`);
}

// Header search functionality
function setupHeaderSearch() {
    const headerSearchInput = document.querySelector('.header-search-input');
    const headerSearchBtn = document.querySelector('.header-search-btn');
    
    if (headerSearchInput && headerSearchBtn) {
        headerSearchBtn.addEventListener('click', function() {
            const query = headerSearchInput.value.trim();
            if (query) {
                // Use the same search logic as main search
                document.querySelector('.search-input').value = query;
                performSearch();
                alert(`Tìm kiếm: "${query}"`);
            }
        });
        
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                headerSearchBtn.click();
            }
        });
    }
}

// Call setup header search in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    setupEventListeners();
    setupHeaderSearch(); // Add this line
});
