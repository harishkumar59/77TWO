// Sample Data
const sampleData = {
  orders: [
      { id: 'ORD001', customer: 'John Doe', amount: 1500, status: 'Completed', date: '2024-03-15' },
      { id: 'ORD002', customer: 'Jane Smith', amount: 2300, status: 'Pending', date: '2024-03-14' },
      { id: 'ORD003', customer: 'Mike Johnson', amount: 1800, status: 'In Progress', date: '2024-03-13' }
  ],
  drivers: [
      { id: 'DRV001', name: 'Amit Kumar', status: 'Available' },
      { id: 'DRV002', name: 'Priya Sharma', status: 'On Delivery' },
      { id: 'DRV003', name: 'Raj Patel', status: 'Available' }
  ]
};

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const loginPage = document.getElementById('login-page');
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTabs = document.querySelectorAll('.form-tab');
const logoutBtn = document.getElementById('logout-btn');
const userRoleDisplay = document.getElementById('user-role');
const backToHomeBtn = document.getElementById('back-to-home-btn');

// Interface Elements
const adminInterface = document.getElementById('admin-interface');
const salesmanInterface = document.getElementById('salesman-interface');
const driverInterface = document.getElementById('driver-interface');
const workerInterface = document.getElementById('worker-interface');

// Tab Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Hide splash screen after 2.5 seconds
  setTimeout(() => {
      splashScreen.style.animation = 'fadeOut 0.5s ease-in forwards';
      setTimeout(() => {
          splashScreen.style.display = 'none';
          mainContent.style.display = 'block';
          mainContent.style.animation = 'fadeIn 0.5s ease-in';
      }, 500);
  }, 2500);

  // Initialize tables with sample data
  initializeTables();
  
  // Add event listeners for main content buttons
  setupMainContentListeners();
  
  // Setup learn more buttons
  setupLearnMoreButtons();
  
  // Setup back to home button
  setupBackToHomeButton();
  
  // Setup form tabs
  setupFormTabs();
  
  // Setup sales filters
  setupSalesFilters();
});

// Setup Form Tabs
function setupFormTabs() {
  formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      formTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show the corresponding form
      const formType = tab.dataset.form;
      if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      }
    });
  });
}

// Setup Learn More Buttons
function setupLearnMoreButtons() {
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the module name from the parent card
      const card = button.closest('.feature-card');
      const moduleName = card.querySelector('h3').textContent;
      
      // Transition to login page with the selected module
      mainContent.style.animation = 'fadeOut 0.5s ease-in forwards';
      setTimeout(() => {
        mainContent.style.display = 'none';
        loginPage.style.display = 'block';
        loginPage.style.animation = 'fadeIn 0.5s ease-in';
        
        // Set the selected module
        const selectedModuleElement = document.getElementById('selected-module');
        if (selectedModuleElement) {
          selectedModuleElement.textContent = moduleName;
        }
        
        // Update login page title
        const loginTitle = document.querySelector('.login-header h2');
        if (loginTitle) {
          loginTitle.innerHTML = `Login to <span class="highlight">${moduleName}</span>`;
        }
      }, 500);
    });
  });
}

// Setup Main Content Event Listeners
function setupMainContentListeners() {
  const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
  const exploreBtn = document.querySelector('.hero-buttons .btn-outline');
  const scrollDownBtn = document.querySelector('.scroll-down-btn');
  const arrowBtn = document.querySelector('.arrow-btn');
  const learnMoreLinks = document.querySelectorAll('.learn-more');
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      mainContent.style.animation = 'fadeOut 0.5s ease-in forwards';
      setTimeout(() => {
        mainContent.style.display = 'none';
        loginPage.style.display = 'block';
        loginPage.style.animation = 'fadeIn 0.5s ease-in';
      }, 500);
    });
  }
  
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      // Scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      // Scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  if (arrowBtn) {
    arrowBtn.addEventListener('click', () => {
      // Scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Add hover effect for arrow button
    arrowBtn.addEventListener('mouseenter', () => {
      arrowBtn.style.transform = 'scale(1.1)';
      arrowBtn.style.boxShadow = '0 0 15px rgba(37, 99, 235, 0.5)';
    });
    
    arrowBtn.addEventListener('mouseleave', () => {
      arrowBtn.style.transform = '';
      arrowBtn.style.boxShadow = '';
    });
  }
  
  // Add hover effect for learn more links
  learnMoreLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const arrow = link.querySelector('.arrow-right');
      if (arrow) {
        arrow.style.transform = 'translateX(3px)';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      const arrow = link.querySelector('.arrow-right');
      if (arrow) {
        arrow.style.transform = '';
      }
    });
  });
}

// Login Form Handler
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if (!username || !password || !role) {
      alert('Please fill in all fields');
      return;
  }

  // Hide login, show app
  loginPage.style.display = 'none';
  app.style.display = 'block';
  userRoleDisplay.textContent = role.charAt(0).toUpperCase() + role.slice(1);

  // Show appropriate interface
  hideAllInterfaces();
  switch (role) {
      case 'admin':
          adminInterface.style.display = 'block';
          break;
      case 'salesman':
          salesmanInterface.style.display = 'block';
          break;
      case 'driver':
          driverInterface.style.display = 'block';
          break;
      case 'worker':
          workerInterface.style.display = 'block';
          break;
  }
});

// Registration Form Handler
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullname = document.getElementById('reg-fullname').value;
  const phone = document.getElementById('reg-phone').value;
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm-password').value;
  const role = document.getElementById('reg-role').value;
  const termsAgreed = document.getElementById('terms').checked;

  // Basic validation
  if (!fullname || !phone || !username || !password || !confirmPassword || !role || !termsAgreed) {
    alert('Please fill in all fields and agree to the terms');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Phone number validation (simple 10-digit check)
  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'registration-success';
  successMessage.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <p>Registration successful! You can now log in with your credentials.</p>
  `;
  
  // Insert success message before the form
  registerForm.parentNode.insertBefore(successMessage, registerForm);
  
  // Hide registration form
  registerForm.style.display = 'none';
  
  // Show success message
  successMessage.style.display = 'block';
  
  // Switch to login tab after 2 seconds
  setTimeout(() => {
    // Click the login tab
    formTabs[0].click();
    
    // Remove success message
    successMessage.remove();
    
    // Pre-fill login form with registration details
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    document.getElementById('role').value = role;
  }, 2000);
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
  app.style.display = 'none';
  loginPage.style.display = 'block';
  loginForm.reset();
});

// Tab Navigation Handler
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      navTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.dataset.tab;
      const tabContent = document.getElementById(tabId);
      tabContent.classList.add('active');
      
      // If Sales Management tab is clicked, scroll to the section
      if (tabId === 'sales') {
        // Smooth scroll to the Sales Management section
        setTimeout(() => {
          const salesSection = document.getElementById('sales-management-section');
          if (salesSection) {
            // Remove any existing highlight animation
            salesSection.classList.remove('highlight-section');
            
            // Scroll to the section
            salesSection.scrollIntoView({ behavior: 'smooth' });
            
            // Further scroll to show the filter section at the top with header offset
            setTimeout(() => {
              window.scrollBy({
                top: -80, // Adjust this value to account for header height
                behavior: 'smooth'
              });
              
              // Add highlight effect after scrolling
              setTimeout(() => {
                salesSection.classList.add('highlight-section');
              }, 300);
            }, 300);
          }
        }, 100);
      }
  });
});

// Initialize Tables with Sample Data
function initializeTables() {
  // Recent Orders Table
  const recentOrdersTable = document.getElementById('recent-orders');
  if (recentOrdersTable) {
      recentOrdersTable.innerHTML = sampleData.orders.map(order => `
          <tr>
              <td>${order.id}</td>
              <td>${order.customer}</td>
              <td>₹${order.amount}</td>
              <td>${order.status}</td>
              <td>${order.date}</td>
          </tr>
      `).join('');
  }

  // Sales Table
  const salesTable = document.getElementById('sales-table');
  if (salesTable) {
      salesTable.innerHTML = sampleData.orders.map(order => `
          <tr>
              <td>${order.id}</td>
              <td>${order.customer}</td>
              <td>₹${order.amount}</td>
              <td>${order.status}</td>
              <td>
                  <button class="btn btn-primary btn-sm assign-driver-btn" data-order-id="${order.id}">Assign Driver</button>
              </td>
          </tr>
      `).join('');
  }
}

// Helper Functions
function hideAllInterfaces() {
  adminInterface.style.display = 'none';
  salesmanInterface.style.display = 'none';
  driverInterface.style.display = 'none';
  workerInterface.style.display = 'none';
}

// Setup Sales Filters
function setupSalesFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterSection = button.closest('.filter-section');
      const sectionButtons = filterSection.querySelectorAll('.filter-btn');
      sectionButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  // Setup driver assignment buttons
  const assignDriverButtons = document.querySelectorAll('.assign-driver-btn');
  assignDriverButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const orderId = row.cells[0].textContent;
      
      // Create and show the driver assignment modal
      showDriverAssignmentModal(orderId);
    });
  });
}

// Driver Assignment Modal
function showDriverAssignmentModal(orderId) {
  // Remove existing modal if any
  const existingModal = document.querySelector('.driver-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal HTML
  const modalHTML = `
    <div class="driver-modal">
      <div class="driver-modal-content">
        <h3>Assign Driver to Order ${orderId}</h3>
        <div class="driver-list">
          ${sampleData.drivers.map(driver => `
            <div class="driver-item ${driver.status === 'Available' ? 'available' : 'busy'}">
              <div class="driver-info">
                <span class="driver-name">${driver.name}</span>
                <span class="driver-status">${driver.status}</span>
              </div>
              <button class="btn btn-sm ${driver.status === 'Available' ? 'btn-primary' : 'btn-disabled'}" 
                      ${driver.status !== 'Available' ? 'disabled' : ''}
                      onclick="assignDriver('${orderId}', '${driver.id}')">
                Select
              </button>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-text" onclick="closeDriverModal()">Cancel</button>
      </div>
    </div>
  `;

  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Assign Driver Function
function assignDriver(orderId, driverId) {
  const driver = sampleData.drivers.find(d => d.id === driverId);
  if (driver) {
    // Update the table row
    const row = document.querySelector(`tr td:first-child:contains('${orderId}')`).parentElement;
    row.cells[5].textContent = driver.name;
    row.cells[4].innerHTML = '<span class="status-assigned">assigned</span>';
    
    // Update driver status
    driver.status = 'On Delivery';
    
    // Close modal
    closeDriverModal();
    
    // Show success message
    showNotification(`Driver ${driver.name} assigned to order ${orderId}`, 'success');
  }
}

// Close Driver Modal
function closeDriverModal() {
  const modal = document.querySelector('.driver-modal');
  if (modal) {
    modal.remove();
  }
}

// Show Notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Setup Back to Home Button
function setupBackToHomeButton() {
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Transition back to main content
      loginPage.style.animation = 'fadeOut 0.5s ease-in forwards';
      setTimeout(() => {
        loginPage.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.animation = 'fadeIn 0.5s ease-in';
      }, 500);
    });
  }
}

// New Order Form Handler
const newOrderForm = document.getElementById('new-order-form');
if (newOrderForm) {
    newOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const orderItems = document.getElementById('order-items').value;
        const orderAmount = document.getElementById('order-amount').value;
        const paymentMethod = document.getElementById('payment-method').value;

        // Create new order object
        const newOrder = {
            id: `ORD${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            customer: customerName,
            amount: orderAmount,
            paymentMethod: paymentMethod,
            date: new Date().toISOString().split('T')[0]
        };

        // Add to orders table
        const ordersTable = document.getElementById('salesman-orders');
        if (ordersTable) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newOrder.id}</td>
                <td>${newOrder.customer}</td>
                <td>₹${newOrder.amount}</td>
                <td>${newOrder.paymentMethod}</td>
                <td>${newOrder.date}</td>
            `;
            ordersTable.insertBefore(newRow, ordersTable.firstChild);
        }

        // Show success notification
        showNotification('Order submitted successfully', 'success');

        // Reset form
        newOrderForm.reset();
    });
}