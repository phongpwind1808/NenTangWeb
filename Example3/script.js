$(document).ready(function() {

        // Mở form khi click nút Add
        $('#btn-add').click(function () {
            $('#form-modal').modal('show');
        });
    
        // Validate khi submit form
        $('#form-submit').click(function (e) {
            e.preventDefault(); // Ngăn form submit mặc định
    
            const firstName = $('#firstName').val().trim();
            const lastName = $('#lastName').val().trim();
            const address = $('#address').val().trim();
    
            if (firstName === '') {
                alert('Vui lòng nhập Họ.');
                $('#firstName').focus();
                return;
            }
    
            if (lastName === '') {
                alert('Vui lòng nhập Tên.');
                $('#lastName').focus();
                return;
            }
    
            if (address === '') {
                alert('Vui lòng nhập Địa chỉ.');
                $('#address').focus();
                return;
            }
    
            // Nếu tất cả hợp lệ, có thể xử lý tiếp (ví dụ: thêm nhân viên vào bảng)
            alert('Dữ liệu hợp lệ, xử lý tiếp...');
            $('#form-modal').modal('hide');
    
            // TODO: Thêm dữ liệu vào bảng (bạn có thể viết tiếp phần này)
        });
    
    // Sample data
    let studentsData = [
        {
            id: 1,
            name: "Mai",
            lastName: "Thúc Anh",
            address: "23 Hoàng Đạo Thúy, Thanh Xuân, Hà Nội",
            active: true
        },
        {
            id: 2,
            name: "Hoàng",
            lastName: "Sinh Hồng",
            address: "23 Hoàng Đạo Thúy, Thanh Xuân, Hà Nội",
            active: false
        },
        {
            id: 3,
            name: "Tịnh",
            lastName: "Mai Trung",
            address: "1411 Đường Láng, Cầu Giấy, Hà Nội",
            active: true
        },
        {
            id: 4,
            name: "Hùng",
            lastName: "Nguyên Văn",
            address: "1411 Đường Láng, Cầu Giấy, Hà Nội",
            active: false
        }
    ];

    let currentPage = 1;
    let itemsPerPage = 20;
    let filteredData = [...studentsData];
    let isEditing = false;
    let editingId = null;

    // Initialize
    init();

    function init() {
        renderTable();
        bindEvents();
    }

    // Bind all events
    function bindEvents() {
        // Modal events
        $('#btnAdd').on('click', function() {
            showModal();
        });

        $('#modalClose').on('click', function() {
            hideModal();
        });

        $('#cancelBtn').on('click', function() {
            hideModal();
        });

        // Close modal when clicking outside
        $('#addTransactionModal').on('click', function(e) {
            if (e.target === this) {
                hideModal();
            }
        });

        // Form submission
        $('#addTransactionForm').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });

        // Search functionality
        $('#searchInput').on('input', function() {
            applyFilters();
        });

        $('#searchInput').on('keypress', function(e) {
            if (e.which === 13) { // Enter key
                applyFilters();
            }
        });

        $('.search-btn').on('click', function() {
            applyFilters();
        });

        // Results per page
        $('#resultSelect').on('change', function() {
            itemsPerPage = parseInt($(this).val());
            currentPage = 1;
            renderTable();
        });

        // Select all checkbox
        $('#selectAll').on('change', function() {
            const isChecked = $(this).is(':checked');
            $('.row-checkbox').prop('checked', isChecked);
        });

        // Delete selected
        $('#deleteSelected').on('click', function() {
            deleteSelectedStudents();
        });

        // Form validation on input
        $('#name, #lastName, #address').on('input', function() {
            validateField($(this));
        });
    }

    // Render table
    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = filteredData.slice(startIndex, endIndex);

        const $tableBody = $('#tableBody');
        $tableBody.empty();
        
        currentData.forEach(function(student, index) {
            const activeIcon = student.active 
                ? '<i class="fas fa-check status-success"></i>' 
                : '<i class="fas fa-times status-error"></i>';

            const row = `
                <tr>
                    <td>
                        <input type="checkbox" class="row-checkbox" data-id="${student.id}">
                    </td>
                    <td>
                        <button class="btn-action btn-view" title="Xem" data-id="${student.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-edit" title="Sửa" data-id="${student.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action btn-delete" title="Xóa" data-id="${student.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                    <td>${startIndex + index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.lastName}</td>
                    <td>${student.address}</td>
                    <td class="status-icon">
                        ${activeIcon}
                    </td>
                </tr>
            `;
            $tableBody.append(row);
        });

        // Bind action buttons
        $('.btn-view').on('click', function() {
            const id = parseInt($(this).data('id'));
            viewStudent(id);
        });

        $('.btn-edit').on('click', function() {
            const id = parseInt($(this).data('id'));
            editStudent(id);
        });

        $('.btn-delete').on('click', function() {
            const id = parseInt($(this).data('id'));
            deleteStudent(id);
        });

        // Update pagination info
        updatePaginationInfo();
    }

    // Update pagination info
    function updatePaginationInfo() {
        const totalItems = filteredData.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const start = totalItems > 0 ? startIndex + 1 : 0;
        const end = Math.min(startIndex + itemsPerPage, totalItems);
        $('#paginationInfo').text(`Kết quả ${start} đến ${end}`);
    }

    // Apply filters
    function applyFilters() {
        const searchTerm = $('#searchInput').val().toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredData = [...studentsData];
        } else {
            filteredData = studentsData.filter(function(student) {
                return student.name.toLowerCase().includes(searchTerm) ||
                       student.lastName.toLowerCase().includes(searchTerm) ||
                       student.address.toLowerCase().includes(searchTerm);
            });
        }
        
        currentPage = 1;
        renderTable();
    }

    // Modal functions
    function showModal() {
        $('#addTransactionModal').addClass('show');
        clearForm();
        isEditing = false;
        editingId = null;
        $('.modal-header h3').text('Thêm Nhân viên');
        $('.btn-add-submit').text('Thêm');
    }

    function hideModal() {
        $('#addTransactionModal').removeClass('show');
    }

    function clearForm() {
        $('#addTransactionForm')[0].reset();
        clearErrors();
    }

    function clearErrors() {
        $('#nameError').text('');
        $('#lastNameError').text('');
        $('#addressError').text('');
        
        $('#name, #lastName, #address').removeClass('error success');
    }

    // Form validation
    function validateField($field) {
        const fieldName = $field.attr('name');
        const value = $field.val().trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Vui lòng nhập tên';
                    isValid = false;
                }
                $('#nameError').text(errorMessage);
                break;
            case 'lastName':
                if (!value) {
                    errorMessage = 'Vui lòng nhập họ đệm';
                    isValid = false;
                }
                $('#lastNameError').text(errorMessage);
                break;
            case 'address':
                if (!value) {
                    errorMessage = 'Vui lòng nhập địa chỉ';
                    isValid = false;
                }
                $('#addressError').text(errorMessage);
                break;
        }

        if (isValid) {
            $field.removeClass('error').addClass('success');
        } else {
            $field.removeClass('success').addClass('error');
        }

        return isValid;
    }

    function validateForm() {
        let isValid = true;
        
        isValid = validateField($('#name')) && isValid;
        isValid = validateField($('#lastName')) && isValid;
        isValid = validateField($('#address')) && isValid;

        return isValid;
    }

    // Handle form submission
    function handleFormSubmit() {
        if (!validateForm()) {
            return;
        }

        const formData = {
            name: $('#name').val().trim(),
            lastName: $('#lastName').val().trim(),
            address: $('#address').val().trim()
        };

        if (isEditing && editingId) {
            updateStudent(editingId, formData);
        } else {
            addStudent(formData);
        }

        hideModal();
    }

    // CRUD functions
    function addStudent(studentData) {
        const newId = studentsData.length > 0 ? Math.max(...studentsData.map(s => s.id)) + 1 : 1;
        const newStudent = {
            id: newId,
            name: studentData.name,
            lastName: studentData.lastName,
            address: studentData.address,
            active: true
        };
        
        studentsData.push(newStudent);
        applyFilters();
        
        // Show success message
        showMessage('Thêm sinh viên thành công!', 'success');
    }

    function viewStudent(id) {
        const student = studentsData.find(s => s.id === id);
        if (student) {
            const statusText = student.active ? 'Hoạt động' : 'Không hoạt động';
            const message = `
                Thông tin sinh viên:
                - Tên: ${student.name}
                - Họ đệm: ${student.lastName}
                - Địa chỉ: ${student.address}
                - Trạng thái: ${statusText}
            `;
            alert(message);
        }
    }

    function editStudent(id) {
        const student = studentsData.find(s => s.id === id);
        if (student) {
            $('#name').val(student.name);
            $('#lastName').val(student.lastName);
            $('#address').val(student.address);
            
            isEditing = true;
            editingId = id;
            $('.modal-header h3').text('Sửa Nhân viên');
            $('.btn-add-submit').text('Cập nhật');
            showModal();
        }
    }

    function updateStudent(id, studentData) {
        const index = studentsData.findIndex(s => s.id === id);
        if (index !== -1) {
            studentsData[index] = {
                ...studentsData[index],
                name: studentData.name,
                lastName: studentData.lastName,
                address: studentData.address
            };
            applyFilters();
            showMessage('Cập nhật sinh viên thành công!', 'success');
        }
    }

    function deleteStudent(id) {
        const student = studentsData.find(s => s.id === id);
        if (student && confirm(`Bạn có chắc chắn muốn xóa sinh viên "${student.name} ${student.lastName}"?`)) {
            studentsData = studentsData.filter(s => s.id !== id);
            applyFilters();
            showMessage('Xóa sinh viên thành công!', 'success');
        }
    }

    function deleteSelectedStudents() {
        const selectedIds = [];
        $('.row-checkbox:checked').each(function() {
            selectedIds.push(parseInt($(this).data('id')));
        });

        if (selectedIds.length === 0) {
            alert('Vui lòng chọn ít nhất một sinh viên để xóa!');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} sinh viên đã chọn?`)) {
            studentsData = studentsData.filter(s => !selectedIds.includes(s.id));
            applyFilters();
            $('#selectAll').prop('checked', false);
            showMessage(`Đã xóa ${selectedIds.length} sinh viên!`, 'success');
        }
    }

    // Utility functions
    function showMessage(message, type = 'info') {
        // Create a simple toast message
        const toast = $(`
            <div class="toast-message toast-${type}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                font-size: 14px;
                max-width: 300px;
                animation: slideInRight 0.3s ease;
            ">
                ${message}
            </div>
        `);

        $('body').append(toast);

        // Auto remove after 3 seconds
        setTimeout(function() {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Add CSS for toast animation
    $('<style>').prop('type', 'text/css').html(`
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }`);
});

// Export functionality (can be extended)
$(document).on('click', '.export-control', function() {
    exportToCSV();
});

function exportToCSV() {
    const headers = ['STT', 'Tên', 'Họ đệm', 'Địa chỉ', 'Hoạt động'];
    const csvContent = [headers.join(',')];
    
    filteredData.forEach(function(student, index) {
        const row = [
            index + 1,
            `"${student.name}"`,
            `"${student.lastName}"`,
            `"${student.address}"`,
            student.active ? 'Có' : 'Không'
        ];
        csvContent.push(row.join(','));
    });
    
    const csvString = csvContent.join('\n');
    const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'danh_sach_sinh_vien.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage('Xuất file CSV thành công!', 'success');
    }
};