// // Use data from data.js file
// let currentData = getAllTransactions();
// let selectedRows = new Set();

// // DOM elements
// const tableBody = document.getElementById('tableBody');
// const deleteButton = document.getElementById('deleteSelected');
// const searchInput = document.querySelector('.search-input');
// const searchButton = document.querySelector('.search-btn');
// const addButton = document.querySelector('.btn-add');
// const exportControl = document.querySelector('.export-control');
// const resultSelect = document.querySelector('.result-select');

// // Modal elements
// const modal = document.getElementById('addTransactionModal');
// const modalClose = document.getElementById('modalClose');
// const cancelBtn = document.getElementById('cancelBtn');
// const addTransactionForm = document.getElementById('addTransactionForm');

// // Initialize the application
// // (Moved to bottom of file)

// // Render table with current data
// function renderTable() {
//     tableBody.innerHTML = '';
    
//     currentData.forEach(item => {
//         const row = document.createElement('tr');
//         row.dataset.id = item.id;
        
//         row.innerHTML = `
//             <td><input type="checkbox" class="row-checkbox" data-id="${item.id}"></td>
//             <td>
//                 <button class="btn-action btn-view" onclick="viewRecord(${item.id})" title="Xem chi tiết">
//                     <i class="fas fa-eye"></i>
//                 </button>
//                 <button class="btn-action btn-edit" onclick="editRecord(${item.id})" title="Chỉnh sửa">
//                     <i class="fas fa-edit"></i>
//                 </button>
//                 <button class="btn-action btn-delete" onclick="deleteRecord(${item.id})" title="Xóa">
//                     <i class="fas fa-trash"></i>
//                 </button>
//             </td>
//             <td>${item.year}</td>
//             <td>${item.customer}</td>
//             <td>${item.employee}</td>
//             <td>${item.amount}</td>
//             <td>${item.date}</td>
//         `;
        
//         tableBody.appendChild(row);
//     });
    
//     updateDeleteButtonState();
// }

// // Setup event listeners
// function setupEventListeners() {
//     // Checkbox handling
//     tableBody.addEventListener('change', function(e) {
//         if (e.target.classList.contains('row-checkbox')) {
//             const id = parseInt(e.target.dataset.id);
//             if (e.target.checked) {
//                 selectedRows.add(id);
//             } else {
//                 selectedRows.delete(id);
//             }
//             updateDeleteButtonState();
//         }
//     });
    
//     // Delete selected records
//     deleteButton.addEventListener('click', deleteSelectedRecords);
    
//     // Search functionality
//     searchButton.addEventListener('click', performSearch);
//     searchInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             performSearch();
//         }
//     });
    
//     // Clear search when input is empty
//     searchInput.addEventListener('input', function() {
//         if (this.value.trim() === '') {
//             currentData = getAllTransactions();
//             renderTable();
//         }
//     });
    
//     // Add button functionality - Show modal
//     addButton.addEventListener('click', function() {
//         showModal();
//     });
    
//     // Modal event listeners
//     modalClose.addEventListener('click', hideModal);
//     cancelBtn.addEventListener('click', hideModal);
    
//     // Close modal when clicking outside
//     modal.addEventListener('click', function(e) {
//         if (e.target === modal) {
//             hideModal();
//         }
//     });
    
//     // Close modal with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && modal.classList.contains('show')) {
//             hideModal();
//         }
//     });
    
//     // Handle form submission
//     addTransactionForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         handleAddTransaction();
//     });
    
//     // Real-time validation
//     const customerInput = document.getElementById('customer');
//     const employeeInput = document.getElementById('employee');
//     const amountInput = document.getElementById('amount');
    
//     customerInput.addEventListener('blur', function() {
//         validateField('customer', this.value.trim());
//     });
    
//     customerInput.addEventListener('input', function() {
//         if (this.classList.contains('error')) {
//             clearError('customerError');
//             this.classList.remove('error');
//         }
//     });
    
//     employeeInput.addEventListener('blur', function() {
//         validateField('employee', this.value.trim());
//     });
    
//     employeeInput.addEventListener('input', function() {
//         if (this.classList.contains('error')) {
//             clearError('employeeError');
//             this.classList.remove('error');
//         }
//     });
    
//     amountInput.addEventListener('blur', function() {
//         validateField('amount', this.value.trim());
//     });
    
//     amountInput.addEventListener('input', function() {
//         if (this.classList.contains('error')) {
//             clearError('amountError');
//             this.classList.remove('error');
//         }
//     });
    
//     // Export functionality
//     exportControl.addEventListener('click', function() {
//         exportData();
//     });
    
//     // Result per page functionality
//     resultSelect.addEventListener('change', function() {
//         const resultsPerPage = parseInt(this.value);
//         // This would typically trigger pagination update
//         console.log(`Hiển thị ${resultsPerPage} kết quả mỗi trang`);
//         alert(`Đã chọn hiển thị ${resultsPerPage} kết quả mỗi trang`);
//     });
// }

// // Update delete button state
// function updateDeleteButtonState() {
//     const hasSelection = selectedRows.size > 0;
//     deleteButton.disabled = !hasSelection;
//     deleteButton.style.opacity = hasSelection ? '1' : '0.6';
//     deleteButton.style.cursor = hasSelection ? 'pointer' : 'not-allowed';
    
//     // Update select all checkbox
//     const selectAllCheckbox = document.getElementById('selectAll');
//     if (selectAllCheckbox) {
//         selectAllCheckbox.checked = selectedRows.size === currentData.length && currentData.length > 0;
//         selectAllCheckbox.indeterminate = selectedRows.size > 0 && selectedRows.size < currentData.length;
//     }
// }

// // Perform search
// function performSearch() {
//     const query = searchInput.value.trim().toLowerCase();
    
//     if (!query) {
//         currentData = getAllTransactions();
//         renderTable();
//         return;
//     }
    
//     currentData = searchTransactions(query);
//     selectedRows.clear();
//     renderTable();
// }

// // Delete selected records
// function deleteSelectedRecords() {
//     if (selectedRows.size === 0) {
//         alert('Vui lòng chọn ít nhất một bản ghi để xóa.');
//         return;
//     }
    
//     const confirmMessage = `Bạn có chắc chắn muốn xóa ${selectedRows.size} bản ghi đã chọn?`;
//     if (confirm(confirmMessage)) {
//         // Remove selected items from both arrays
//         currentData = currentData.filter(item => !selectedRows.has(item.id));
//         sampleData.splice(0, sampleData.length, ...sampleData.filter(item => !selectedRows.has(item.id)));
        
//         selectedRows.clear();
//         renderTable();
        
//         alert(`Đã xóa thành công ${selectedRows.size} bản ghi.`);
//     }
// }

// // Action button functions
// function viewRecord(id) {
//     const record = currentData.find(item => item.id === id);
//     if (record) {
//         alert(`Xem chi tiết:\nNăm: ${record.year}\nKhách hàng: ${record.customer}\nNhãn hiệu: ${record.brand}\nSố tiền: ${record.amount}\nNgày mua: ${record.date}`);
//     }
// }

// function editRecord(id) {
//     const record = currentData.find(item => item.id === id);
//     if (record) {
//         const newCustomer = prompt('Nhập tên khách hàng mới:', record.customer);
//         if (newCustomer && newCustomer.trim() !== '') {
//             record.customer = newCustomer.trim();
            
//             // Update in original data too
//             const originalRecord = sampleData.find(item => item.id === id);
//             if (originalRecord) {
//                 originalRecord.customer = newCustomer.trim();
//             }
            
//             renderTable();
//             alert('Cập nhật thành công!');
//         }
//     }
// }

// function deleteRecord(id) {
//     const record = currentData.find(item => item.id === id);
//     if (record) {
//         const confirmMessage = `Bạn có chắc chắn muốn xóa bản ghi của "${record.customer}"?`;
//         if (confirm(confirmMessage)) {
//             currentData = currentData.filter(item => item.id !== id);
//             sampleData.splice(0, sampleData.length, ...sampleData.filter(item => item.id !== id));
//             selectedRows.delete(id);
//             renderTable();
//             alert('Xóa bản ghi thành công!');
//         }
//     }
// }

// // Select all functionality (can be added to header checkbox)
// function toggleSelectAll() {
//     const allCheckboxes = document.querySelectorAll('.row-checkbox');
//     const allSelected = selectedRows.size === currentData.length;
    
//     if (allSelected) {
//         // Unselect all
//         selectedRows.clear();
//         allCheckboxes.forEach(cb => cb.checked = false);
//     } else {
//         // Select all
//         selectedRows.clear();
//         currentData.forEach(item => selectedRows.add(item.id));
//         allCheckboxes.forEach(cb => cb.checked = true);
//     }
    
//     updateDeleteButtonState();
// }

// // Pagination functions (can be enhanced)
// function goToPage(page) {
//     // This is a placeholder for pagination functionality
//     console.log(`Going to page ${page}`);
//     // Update pagination UI
//     document.querySelectorAll('.page-link, .page-active').forEach(el => {
//         el.classList.remove('page-active');
//         el.classList.add('page-link');
//     });
    
//     // Set active page
//     const pageElements = document.querySelectorAll('.pagination-controls span, .pagination-controls a');
//     pageElements.forEach(el => {
//         if (el.textContent === page.toString()) {
//             el.classList.remove('page-link');
//             el.classList.add('page-active');
//         }
//     });
// }

// // Export data (bonus feature)
// function exportData() {
//     if (currentData.length === 0) {
//         alert('Không có dữ liệu để xuất!');
//         return;
//     }
    
//     const csvContent = "data:text/csv;charset=utf-8," 
//         + "Năm đăng,Khách hàng,Nhãn hiệu,Số tiền,Ngày mua\n"
//         + currentData.map(item => 
//             `${item.year},"${item.customer}","${item.brand}","${item.amount}","${item.date}"`
//         ).join("\n");
    
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "danh_sach_giao_dich.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     alert(`Đã xuất ${currentData.length} bản ghi ra file CSV!`);
// }

// // Header search functionality
// function setupHeaderSearch() {
//     const headerSearchInput = document.querySelector('.header-search-input');
//     const headerSearchBtn = document.querySelector('.header-search-btn');
    
//     if (headerSearchInput && headerSearchBtn) {
//         headerSearchBtn.addEventListener('click', function() {
//             const query = headerSearchInput.value.trim();
//             if (query) {
//                 // Use the same search logic as main search
//                 document.querySelector('.search-input').value = query;
//                 performSearch();
//                 alert(`Tìm kiếm: "${query}"`);
//             }
//         });
        
//         headerSearchInput.addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 headerSearchBtn.click();
//             }
//         });
//     }
// }

// // Modal functions
// function showModal() {
//     modal.classList.add('show');
//     document.body.style.overflow = 'hidden';
//     // Clear form
//     addTransactionForm.reset();
//     // Focus on first input
//     document.getElementById('customer').focus();
// }

// function hideModal() {
//     modal.classList.remove('show');
//     document.body.style.overflow = 'auto';
//     // Clear form and errors
//     addTransactionForm.reset();
//     clearAllErrors();
// }

// function handleAddTransaction() {
//     // Clear previous errors
//     clearAllErrors();
    
//     // Get form data
//     const formData = new FormData(addTransactionForm);
//     const customerName = formData.get('customer').trim();
//     const employeeName = formData.get('employee').trim();
//     const amount = formData.get('amount').trim();
    
//     // Validation
//     let isValid = true;
    
//     // Validate customer name
//     if (!customerName) {
//         showError('customerError', 'Tên khách hàng không được để trống');
//         setFieldError('customer');
//         isValid = false;
//     } else if (customerName.length > 30) {
//         showError('customerError', 'Tên khách hàng không được quá 30 ký tự');
//         setFieldError('customer');
//         isValid = false;
//     } else {
//         setFieldSuccess('customer');
//     }
    
//     // Validate employee name
//     if (!employeeName) {
//         showError('employeeError', 'Tên nhân viên không được để trống');
//         setFieldError('employee');
//         isValid = false;
//     } else if (employeeName.length > 30) {
//         showError('employeeError', 'Tên nhân viên không được quá 30 ký tự');
//         setFieldError('employee');
//         isValid = false;
//     } else {
//         setFieldSuccess('employee');
//     }
    
//     // Validate amount
//     if (!amount) {
//         showError('amountError', 'Số tiền không được để trống');
//         setFieldError('amount');
//         isValid = false;
//     } else if (isNaN(amount) || parseFloat(amount) <= 0) {
//         showError('amountError', 'Số tiền phải là số dương hợp lệ');
//         setFieldError('amount');
//         isValid = false;
//     } else {
//         setFieldSuccess('amount');
//     }
    
//     // If validation fails, stop here
//     if (!isValid) {
//         return;
//     }
    
//     // Create new transaction
//     const newTransactionData = {
//         year: new Date().getFullYear().toString(),
//         customer: customerName,
//         employee: employeeName,
//         amount: parseInt(amount).toLocaleString(),
//         rawAmount: parseInt(amount),
//         date: new Date().toLocaleDateString('vi-VN', {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         })
//     };
    
//     // Add to data using data.js function
//     const newTransaction = addTransaction(newTransactionData);
    
//     // Update current data
//     currentData = getAllTransactions();
    
//     // Re-render table
//     renderTable();
    
//     // Hide modal
//     hideModal();
    
//     // Show success message
//     alert('Thêm giao dịch thành công!');
// }

// // Validation helper functions
// function showError(elementId, message) {
//     const errorElement = document.getElementById(elementId);
//     if (errorElement) {
//         errorElement.textContent = message;
//     }
// }

// function clearError(elementId) {
//     const errorElement = document.getElementById(elementId);
//     if (errorElement) {
//         errorElement.textContent = '';
//     }
// }

// function clearAllErrors() {
//     clearError('customerError');
//     clearError('employeeError');
//     clearError('amountError');
    
//     // Clear field styling
//     document.getElementById('customer').classList.remove('error', 'success');
//     document.getElementById('employee').classList.remove('error', 'success');
//     document.getElementById('amount').classList.remove('error', 'success');
// }

// function setFieldError(fieldId) {
//     const field = document.getElementById(fieldId);
//     if (field) {
//         field.classList.remove('success');
//         field.classList.add('error');
//     }
// }

// function setFieldSuccess(fieldId) {
//     const field = document.getElementById(fieldId);
//     if (field) {
//         field.classList.remove('error');
//         field.classList.add('success');
//     }
// }

// // Real-time validation function
// function validateField(fieldId, value) {
//     switch(fieldId) {
//         case 'customer':
//             if (!value) {
//                 showError('customerError', 'Tên khách hàng không được để trống');
//                 setFieldError('customer');
//                 return false;
//             } else if (value.length > 30) {
//                 showError('customerError', 'Tên khách hàng không được quá 30 ký tự');
//                 setFieldError('customer');
//                 return false;
//             } else {
//                 clearError('customerError');
//                 setFieldSuccess('customer');
//                 return true;
//             }
            
//         case 'employee':
//             if (!value) {
//                 showError('employeeError', 'Tên nhân viên không được để trống');
//                 setFieldError('employee');
//                 return false;
//             } else if (value.length > 30) {
//                 showError('employeeError', 'Tên nhân viên không được quá 30 ký tự');
//                 setFieldError('employee');
//                 return false;
//             } else {
//                 clearError('employeeError');
//                 setFieldSuccess('employee');
//                 return true;
//             }
            
//         case 'amount':
//             if (!value) {
//                 showError('amountError', 'Số tiền không được để trống');
//                 setFieldError('amount');
//                 return false;
//             } else if (isNaN(value) || parseFloat(value) <= 0) {
//                 showError('amountError', 'Số tiền phải là số dương hợp lệ');
//                 setFieldError('amount');
//                 return false;
//             } else {
//                 clearError('amountError');
//                 setFieldSuccess('amount');
//                 return true;
//             }
            
//         default:
//             return true;
//     }
// }

// // Call setup header search in DOMContentLoaded
// document.addEventListener('DOMContentLoaded', function() {
//     renderTable();
//     setupEventListeners();
//     setupHeaderSearch(); // Add this line
// });
// Use data from data.js file
let currentData = getAllTransactions();
let selectedRows = new Set();

$(document).ready(function () {
    renderTable();
    setupEventListeners();
    setupHeaderSearch();
});

function renderTable() {
    $('#tableBody').empty();

    currentData.forEach(item => {
        const row = $(`
            <tr data-id="${item.id}">
                <td><input type="checkbox" class="row-checkbox" data-id="${item.id}"></td>
                <td>
                    <button class="btn-action btn-view" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action btn-edit" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td>${item.year}</td>
                <td>${item.customer}</td>
                <td>${item.employee}</td>
                <td>${item.amount}</td>
                <td>${item.date}</td>
            </tr>
        `);

        row.find('.btn-view').on('click', () => viewRecord(item.id));
        row.find('.btn-edit').on('click', () => editRecord(item.id));
        row.find('.btn-delete').on('click', () => deleteRecord(item.id));

        $('#tableBody').append(row);
    });

    updateDeleteButtonState();
}

function setupEventListeners() {
    $('#tableBody').on('change', '.row-checkbox', function () {
        const id = parseInt($(this).data('id'));
        if (this.checked) {
            selectedRows.add(id);
        } else {
            selectedRows.delete(id);
        }
        updateDeleteButtonState();
    });

    $('#deleteSelected').on('click', deleteSelectedRecords);

    $('.search-btn').on('click', performSearch);
    $('.search-input').on('keypress', function (e) {
        if (e.key === 'Enter') performSearch();
    });

    $('.search-input').on('input', function () {
        if (!$(this).val().trim()) {
            currentData = getAllTransactions();
            renderTable();
        }
    });

    $('.btn-add').on('click', showModal);
    $('#modalClose, #cancelBtn').on('click', hideModal);

    $('#addTransactionModal').on('click', function (e) {
        if (e.target === this) hideModal();
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $('#addTransactionModal').hasClass('show')) {
            hideModal();
        }
    });

    $('#addTransactionForm').on('submit', function (e) {
        e.preventDefault();
        handleAddTransaction();
    });

    $('#customer').on('blur', function () {
        validateField('customer', $(this).val().trim());
    }).on('input', function () {
        if ($(this).hasClass('error')) {
            clearError('customerError');
            $(this).removeClass('error');
        }
    });

    $('#employee').on('blur', function () {
        validateField('employee', $(this).val().trim());
    }).on('input', function () {
        if ($(this).hasClass('error')) {
            clearError('employeeError');
            $(this).removeClass('error');
        }
    });

    $('#amount').on('blur', function () {
        validateField('amount', $(this).val().trim());
    }).on('input', function () {
        if ($(this).hasClass('error')) {
            clearError('amountError');
            $(this).removeClass('error');
        }
    });

    $('.export-control').on('click', exportData);

    $('.result-select').on('change', function () {
        const val = parseInt($(this).val());
        alert(`Đã chọn hiển thị ${val} kết quả mỗi trang`);
    });
}

function updateDeleteButtonState() {
    const hasSelection = selectedRows.size > 0;
    $('#deleteSelected')
        .prop('disabled', !hasSelection)
        .css({
            opacity: hasSelection ? '1' : '0.6',
            cursor: hasSelection ? 'pointer' : 'not-allowed'
        });

    const selectAllCheckbox = $('#selectAll');
    if (selectAllCheckbox.length) {
        selectAllCheckbox.prop('checked', selectedRows.size === currentData.length && currentData.length > 0);
        selectAllCheckbox.prop('indeterminate', selectedRows.size > 0 && selectedRows.size < currentData.length);
    }
}

function performSearch() {
    const query = $('.search-input').val().trim().toLowerCase();

    if (!query) {
        currentData = getAllTransactions();
        renderTable();
        return;
    }

    currentData = searchTransactions(query);
    selectedRows.clear();
    renderTable();
}

function deleteSelectedRecords() {
    if (selectedRows.size === 0) {
        alert('Vui lòng chọn ít nhất một bản ghi để xóa.');
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedRows.size} bản ghi đã chọn?`)) {
        currentData = currentData.filter(item => !selectedRows.has(item.id));
        sampleData.splice(0, sampleData.length, ...sampleData.filter(item => !selectedRows.has(item.id)));

        selectedRows.clear();
        renderTable();
        alert(`Đã xóa thành công.`);
    }
}

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
    if (record && confirm(`Bạn có chắc chắn muốn xóa bản ghi của "${record.customer}"?`)) {
        currentData = currentData.filter(item => item.id !== id);
        sampleData.splice(0, sampleData.length, ...sampleData.filter(item => item.id !== id));
        selectedRows.delete(id);
        renderTable();
        alert('Xóa bản ghi thành công!');
    }
}

function showModal() {
    $('#addTransactionModal').addClass('show');
    $('body').css('overflow', 'hidden');
    $('#addTransactionForm')[0].reset();
    $('#customer').focus();
}

function hideModal() {
    $('#addTransactionModal').removeClass('show');
    $('body').css('overflow', 'auto');
    $('#addTransactionForm')[0].reset();
    clearAllErrors();
}

function setupHeaderSearch() {
    const $headerInput = $('.header-search-input');
    const $headerBtn = $('.header-search-btn');

    $headerBtn.on('click', function () {
        const query = $headerInput.val().trim();
        if (query) {
            $('.search-input').val(query);
            performSearch();
            alert(`Tìm kiếm: "${query}"`);
        }
    });

    $headerInput.on('keypress', function (e) {
        if (e.key === 'Enter') $headerBtn.click();
    });
}

function handleAddTransaction() {
    clearAllErrors();

    const formData = new FormData($('#addTransactionForm')[0]);
    const customerName = formData.get('customer').trim();
    const employeeName = formData.get('employee').trim();
    const amount = formData.get('amount').trim();

    let isValid = true;

    if (!customerName || customerName.length > 30) {
        showError('customerError', !customerName ? 'Tên khách hàng không được để trống' : 'Tên khách hàng không được quá 30 ký tự');
        setFieldError('customer');
        isValid = false;
    } else setFieldSuccess('customer');

    if (!employeeName || employeeName.length > 30) {
        showError('employeeError', !employeeName ? 'Tên nhân viên không được để trống' : 'Tên nhân viên không được quá 30 ký tự');
        setFieldError('employee');
        isValid = false;
    } else setFieldSuccess('employee');

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showError('amountError', 'Số tiền phải là số dương hợp lệ');
        setFieldError('amount');
        isValid = false;
    } else setFieldSuccess('amount');

    if (!isValid) return;

    const newTransactionData = {
        year: new Date().getFullYear().toString(),
        customer: customerName,
        employee: employeeName,
        amount: parseInt(amount).toLocaleString(),
        rawAmount: parseInt(amount),
        date: new Date().toLocaleDateString('vi-VN', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    };

    const newTransaction = addTransaction(newTransactionData);
    currentData = getAllTransactions();
    renderTable();
    hideModal();
    alert('Thêm giao dịch thành công!');
}

function showError(id, msg) {
    $(`#${id}`).text(msg);
}

function clearError(id) {
    $(`#${id}`).text('');
}

function clearAllErrors() {
    ['customerError', 'employeeError', 'amountError'].forEach(clearError);
    ['customer', 'employee', 'amount'].forEach(id => $(`#${id}`).removeClass('error success'));
}

function setFieldError(id) {
    $(`#${id}`).removeClass('success').addClass('error');
}

function setFieldSuccess(id) {
    $(`#${id}`).removeClass('error').addClass('success');
}

function validateField(fieldId, value) {
    switch (fieldId) {
        case 'customer':
            return value && value.length <= 30 ? (clearError('customerError'), setFieldSuccess('customer'), true) : (showError('customerError', value.length > 30 ? 'Tên khách hàng không được quá 30 ký tự' : 'Tên khách hàng không được để trống'), setFieldError('customer'), false);
        case 'employee':
            return value && value.length <= 30 ? (clearError('employeeError'), setFieldSuccess('employee'), true) : (showError('employeeError', value.length > 30 ? 'Tên nhân viên không được quá 30 ký tự' : 'Tên nhân viên không được để trống'), setFieldError('employee'), false);
        case 'amount':
            return value && !isNaN(value) && parseFloat(value) > 0 ? (clearError('amountError'), setFieldSuccess('amount'), true) : (showError('amountError', 'Số tiền phải là số dương hợp lệ'), setFieldError('amount'), false);
        default:
            return true;
    }
}
