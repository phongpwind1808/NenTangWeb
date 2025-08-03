// // Modal functionality
// document.addEventListener('DOMContentLoaded', function() {
//     const modal = document.getElementById('addEmployeeModal');
//     const addBtn = document.getElementById('addNewEmployeeBtn');
//     const closeBtn = document.querySelector('.close');
//     const cancelBtn = document.getElementById('cancelBtn');
//     const form = document.getElementById('addEmployeeForm');

//     // Show modal when clicking Add New Employee button
//     addBtn.addEventListener('click', function() {
//         modal.style.display = 'block';
//         document.body.style.overflow = 'hidden'; // Prevent background scrolling
//     });

//     // Hide modal when clicking close button
//     closeBtn.addEventListener('click', function() {
//         closeModal();
//     });

//     // Hide modal when clicking cancel button
//     cancelBtn.addEventListener('click', function() {
//         closeModal();
//     });

//     // Hide modal when clicking outside of it
//     window.addEventListener('click', function(event) {
//         if (event.target === modal) {
//             closeModal();
//         }
//     });

//     // Close modal with escape key
//     document.addEventListener('keydown', function(event) {
//         if (event.key === 'Escape' && modal.style.display === 'block') {
//             closeModal();
//         }
//     });

//     // Handle form submission
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
        
//         // Clear previous errors
//         clearAllErrors();
        
//         // Get form data
//         const formData = new FormData(form);
//         const employeeData = {
//             name: formData.get('name').trim(),
//             email: formData.get('email').trim(),
//             address: formData.get('address').trim(),
//             phone: formData.get('phone').trim()
//         };

//         // Validate form data
//         const isValid = validateForm(employeeData);
        
//         if (isValid) {
//             // Add to data source
//             const newEmployee = addEmployee(employeeData);
            
//             console.log('New employee data:', newEmployee);
//             alert('Employee added successfully!');
            
//             // Reset form and close modal
//             form.reset();
//             clearAllErrors();
//             closeModal();
            
//             // Add the new employee to the table
//             addEmployeeToTable(newEmployee);
//         }
//     });

//     // Real-time validation on input
//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');
//     const addressInput = document.getElementById('address');
//     const phoneInput = document.getElementById('phone');

//     nameInput.addEventListener('blur', () => validateField('name', nameInput.value.trim()));
//     emailInput.addEventListener('blur', () => validateField('email', emailInput.value.trim()));
//     addressInput.addEventListener('blur', () => validateField('address', addressInput.value.trim()));
//     phoneInput.addEventListener('blur', () => validateField('phone', phoneInput.value.trim()));

//     // Clear error when user starts typing
//     nameInput.addEventListener('input', () => clearFieldError('name'));
//     emailInput.addEventListener('input', () => clearFieldError('email'));
//     addressInput.addEventListener('input', () => clearFieldError('address'));
//     phoneInput.addEventListener('input', () => clearFieldError('phone'));

//     function closeModal() {
//         modal.style.display = 'none';
//         document.body.style.overflow = 'auto'; // Restore scrolling
//         form.reset(); // Clear form when closing
//     }

//     function addEmployeeToTable(employee) {
//         const tbody = document.querySelector('tbody');
//         const newRow = document.createElement('tr');
        
//         newRow.innerHTML = `
//             <td><input type="checkbox"></td>
//             <td>${employee.name}</td>
//             <td>${employee.email}</td>
//             <td>${employee.address}</td>
//             <td>${employee.phone}</td>
//             <td>
//                 <button class="btn btn-sm btn-edit"><i class="fa fa-pencil"></i></button>
//                 <button class="btn btn-sm btn-delete"><i class="fa fa-trash"></i></button>
//             </td>
//         `;
        
//         tbody.appendChild(newRow);
//     }

//     // Validation functions
//     function validateForm(data) {
//         let isValid = true;
        
//         // Validate name (required, not empty)
//         if (!validateField('name', data.name)) {
//             isValid = false;
//         }
        
//         // Validate email (required, not empty, valid format)
//         if (!validateField('email', data.email)) {
//             isValid = false;
//         }
        
//         // Validate address (required, not empty)
//         if (!validateField('address', data.address)) {
//             isValid = false;
//         }
        
//         // Validate phone (required, 10 digits, starts with 0)
//         if (!validateField('phone', data.phone)) {
//             isValid = false;
//         }
        
//         return isValid;
//     }

//     function validateField(fieldName, value) {
//         const field = document.getElementById(fieldName);
//         const errorElement = document.getElementById(fieldName + 'Error');
        
//         // Clear previous styling
//         field.classList.remove('error', 'success');
        
//         switch(fieldName) {
//             case 'name':
//                 if (!value || value.length === 0) {
//                     showFieldError(fieldName, 'Tên không được để trống');
//                     return false;
//                 } else if (value.length < 2) {
//                     showFieldError(fieldName, 'Tên phải có ít nhất 2 ký tự');
//                     return false;
//                 }
//                 break;
                
//             case 'email':
//                 if (!value || value.length === 0) {
//                     showFieldError(fieldName, 'Email không được để trống');
//                     return false;
//                 } else if (!isValidEmail(value)) {
//                     showFieldError(fieldName, 'Email không đúng định dạng');
//                     return false;
//                 }
//                 break;
                
//             case 'address':
//                 if (!value || value.length === 0) {
//                     showFieldError(fieldName, 'Địa chỉ không được để trống');
//                     return false;
//                 } else if (value.length < 10) {
//                     showFieldError(fieldName, 'Địa chỉ phải có ít nhất 10 ký tự');
//                     return false;
//                 }
//                 break;
                
//             case 'phone':
//                 if (!value || value.length === 0) {
//                     showFieldError(fieldName, 'Số điện thoại không được để trống');
//                     return false;
//                 } else if (!isValidPhone(value)) {
//                     showFieldError(fieldName, 'Số điện thoại phải có đúng 10 số và bắt đầu bằng 0');
//                     return false;
//                 }
//                 break;
//         }
        
//         // If validation passes
//         field.classList.add('success');
//         errorElement.textContent = '';
//         return true;
//     }

//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     function isValidPhone(phone) {
//         // Phone must be exactly 10 digits and start with 0
//         const phoneRegex = /^0\d{9}$/;
//         return phoneRegex.test(phone);
//     }

//     function showFieldError(fieldName, message) {
//         const field = document.getElementById(fieldName);
//         const errorElement = document.getElementById(fieldName + 'Error');
        
//         field.classList.add('error');
//         errorElement.textContent = message;
//     }

//     function clearFieldError(fieldName) {
//         const field = document.getElementById(fieldName);
//         const errorElement = document.getElementById(fieldName + 'Error');
        
//         field.classList.remove('error');
//         errorElement.textContent = '';
//     }

//     function clearAllErrors() {
//         const fields = ['name', 'email', 'address', 'phone'];
//         fields.forEach(fieldName => {
//             clearFieldError(fieldName);
//             const field = document.getElementById(fieldName);
//             field.classList.remove('success');
//         });
//     }

//     // Load initial data from data.js
//     function loadEmployeesData() {
//         const tbody = document.querySelector('tbody');
//         tbody.innerHTML = ''; // Clear existing data
        
//         const employees = getAllEmployees();
//         employees.slice(0, 5).forEach(employee => { // Show first 5 employees
//             addEmployeeToTable(employee);
//         });
//     }

//     // Load data when page loads
//     loadEmployeesData();
// });
$(document).ready(function () {
    const $modal = $('#addEmployeeModal');
    const $form = $('#addEmployeeForm');
  
    // Mở modal khi nhấn nút thêm nhân viên
    $('#addNewEmployeeBtn').on('click', function () {
      $modal.show();
      $('body').css('overflow', 'hidden');
    });
  
    // Đóng modal khi nhấn nút đóng hoặc cancel
    $('.close, #cancelBtn').on('click', function () {
      closeModal();
    });
  
    // Đóng modal khi click ra ngoài modal
    $(window).on('click', function (event) {
      if ($(event.target).is($modal)) {
        closeModal();
      }
    });
  
    // Đóng modal khi nhấn phím Escape
    $(document).on('keydown', function (event) {
      if (event.key === 'Escape' && $modal.is(':visible')) {
        closeModal();
      }
    });
  
    // Xử lý khi submit form
    $form.on('submit', function (e) {
      e.preventDefault();
      clearAllErrors();
  
      const formData = new FormData(this);
      const employeeData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        address: formData.get('address').trim(),
        phone: formData.get('phone').trim()
      };
  
      if (validateForm(employeeData)) {
        const newEmployee = addEmployee(employeeData);
        alert('Employee added successfully!');
        addEmployeeToTable(newEmployee);
        $form[0].reset();
        clearAllErrors();
        closeModal();
      }
    });
  
    // Real-time validation
    ['name', 'email', 'address', 'phone'].forEach(function (field) {
      const $input = $('#' + field);
  
      $input.on('blur', function () {
        validateField(field, $input.val().trim());
      });
  
      $input.on('input', function () {
        clearFieldError(field);
      });
    });
  
    function closeModal() {
      $modal.hide();
      $('body').css('overflow', 'auto');
      $form[0].reset();
    }
  
    function addEmployeeToTable(employee) {
      const newRow = `<tr>
        <td><input type="checkbox"></td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.address}</td>
        <td>${employee.phone}</td>
        <td>
          <button class="btn btn-sm btn-edit"><i class="fa fa-pencil"></i></button>
          <button class="btn btn-sm btn-delete"><i class="fa fa-trash"></i></button>
        </td>
      </tr>`;
      $('tbody').append(newRow);
    }
  
    function validateForm(data) {
      let isValid = true;
      if (!validateField('name', data.name)) isValid = false;
      if (!validateField('email', data.email)) isValid = false;
      if (!validateField('address', data.address)) isValid = false;
      if (!validateField('phone', data.phone)) isValid = false;
      return isValid;
    }
  
    function validateField(fieldName, value) {
      const $field = $('#' + fieldName);
      const $error = $('#' + fieldName + 'Error');
      $field.removeClass('error success');
  
      switch (fieldName) {
        case 'name':
          if (!value) return showFieldError(fieldName, 'Tên không được để trống');
          if (value.length < 2) return showFieldError(fieldName, 'Tên phải có ít nhất 2 ký tự');
          break;
        case 'email':
          if (!value) return showFieldError(fieldName, 'Email không được để trống');
          if (!isValidEmail(value)) return showFieldError(fieldName, 'Email không đúng định dạng');
          break;
        case 'address':
          if (!value) return showFieldError(fieldName, 'Địa chỉ không được để trống');
          if (value.length < 10) return showFieldError(fieldName, 'Địa chỉ phải có ít nhất 10 ký tự');
          break;
        case 'phone':
          if (!value) return showFieldError(fieldName, 'Số điện thoại không được để trống');
          if (!isValidPhone(value)) return showFieldError(fieldName, 'Số điện thoại phải có đúng 10 số và bắt đầu bằng 0');
          break;
      }
  
      $field.addClass('success');
      $error.text('');
      return true;
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function isValidPhone(phone) {
      return /^0\d{9}$/.test(phone);
    }
  
    function showFieldError(fieldName, message) {
      $('#' + fieldName).addClass('error');
      $('#' + fieldName + 'Error').text(message);
      return false;
    }
  
    function clearFieldError(fieldName) {
      $('#' + fieldName).removeClass('error');
      $('#' + fieldName + 'Error').text('');
    }
  
    function clearAllErrors() {
      ['name', 'email', 'address', 'phone'].forEach(function (field) {
        clearFieldError(field);
        $('#' + field).removeClass('success');
      });
    }
  
    function loadEmployeesData() {
      const employees = getAllEmployees();
      $('tbody').empty();
      employees.slice(0, 5).forEach(addEmployeeToTable);
    }
  
    loadEmployeesData();
  });
  