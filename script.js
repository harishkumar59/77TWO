// Sample Data
const sampleData = {
  orders: [
      { id: 'ORD001', customer: 'John Doe', amount: 1500, status: 'Completed', date: '2024-03-15' },
      { id: 'ORD002', customer: 'Jane Smith', amount: 2300, status: 'Pending', date: '2024-03-14' },
      { id: 'ORD003', customer: 'Mike Johnson', amount: 1800, status: 'In Progress', date: '2024-03-13' }
  ],
  workers: [
      { id: 'WRK001', name: 'Amit Kumar', role: 'Worker', status: 'Active' },
      { id: 'WRK002', name: 'Priya Sharma', role: 'Worker', status: 'Active' },
      { id: 'WRK003', name: 'Raj Patel', role: 'Driver', status: 'On Delivery' }
  ]
};

// Demo Users for Login
const demoUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'sales', password: 'sales123', role: 'salesman' },
  { username: 'driver', password: 'driver123', role: 'driver' },
  { username: 'worker', password: 'worker123', role: 'worker' }
];

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const loginPage = document.getElementById('login-page');
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
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
  
  // Setup demo users display
  setupDemoUsers();
  
  // Setup back to home button
  setupBackToHomeButton();
});

// Setup Demo Users Display
function setupDemoUsers() {
  const demoUsersContainer = document.getElementById('demo-users');
  if (demoUsersContainer) {
    let html = '<h3>Demo Credentials</h3><ul>';
    demoUsers.forEach(user => {
      html += `<li><strong>${user.role}:</strong> ${user.username} / ${user.password}</li>`;
    });
    html += '</ul>';
    demoUsersContainer.innerHTML = html;
  }
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

  // Simple validation against demo users
  const user = demoUsers.find(u => u.username === username && u.password === password && u.role === role);
  
  if (!user) {
    alert('Invalid credentials. Please use one of the demo accounts.');
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
      document.getElementById(tabId).classList.add('active');
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

  // Workers Table
  const workersTable = document.getElementById('workers-table');
  if (workersTable) {
      workersTable.innerHTML = sampleData.workers.map(worker => `
          <tr>
              <td>${worker.id}</td>
              <td>${worker.name}</td>
              <td>${worker.role}</td>
              <td>${worker.status}</td>
              <td>
                  <button class="btn btn-text" onclick="viewWorkerDetails('${worker.id}')">View</button>
              </td>
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
                  <button class="btn btn-text" onclick="viewOrderDetails('${order.id}')">View</button>
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

// Worker Attendance System
const checkInBtn = document.getElementById('check-in');
const checkOutBtn = document.getElementById('check-out');
const attendanceStatus = document.getElementById('attendance-status');
const hoursWorked = document.getElementById('hours-worked');

let checkInTime = null;

if (checkInBtn) {
  checkInBtn.addEventListener('click', () => {
      checkInTime = new Date();
      attendanceStatus.textContent = 'Checked In';
      checkInBtn.disabled = true;
      checkOutBtn.disabled = false;
  });
}

if (checkOutBtn) {
  checkOutBtn.addEventListener('click', () => {
      if (checkInTime) {
          const checkOutTime = new Date();
          const hours = Math.round((checkOutTime - checkInTime) / (1000 * 60 * 60) * 10) / 10;
          hoursWorked.textContent = hours;
          attendanceStatus.textContent = 'Checked Out';
          checkInBtn.disabled = false;
          checkOutBtn.disabled = true;
          checkInTime = null;
      }
  });
}

// View Details Functions
function viewWorkerDetails(workerId) {
  const worker = sampleData.workers.find(w => w.id === workerId);
  if (worker) {
      alert(`Worker Details:\nID: ${worker.id}\nName: ${worker.name}\nRole: ${worker.role}\nStatus: ${worker.status}`);
  }
}

function viewOrderDetails(orderId) {
  const order = sampleData.orders.find(o => o.id === orderId);
  if (order) {
      alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer}\nAmount: ₹${order.amount}\nStatus: ${order.status}\nDate: ${order.date}`);
  }
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