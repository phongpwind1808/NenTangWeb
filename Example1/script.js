// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('addEmployeeModal');
    const addBtn = document.getElementById('addNewEmployeeBtn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('addEmployeeForm');

    // Show modal when clicking Add New Employee button
    addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Hide modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Hide modal when clicking cancel button
    cancelBtn.addEventListener('click', function() {
        closeModal();
    });

    // Hide modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const employeeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            phone: formData.get('phone')
        };

        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('New employee data:', employeeData);
        alert('Employee added successfully!');
        
        // Reset form and close modal
        form.reset();
        closeModal();
        
        // Optionally, add the new employee to the table
        addEmployeeToTable(employeeData);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        form.reset(); // Clear form when closing
    }

    function addEmployeeToTable(employee) {
        const tbody = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.phone}</td>
            <td>
                <button class="btn btn-sm btn-edit"><i class="fa fa-pencil"></i></button>
                <button class="btn btn-sm btn-delete"><i class="fa fa-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(newRow);
    }
});
