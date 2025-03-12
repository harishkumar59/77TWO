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

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const loginPage = document.getElementById('login-page');
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const userRoleDisplay = document.getElementById('user-role');

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
});

// Setup Main Content Event Listeners
function setupMainContentListeners() {
  const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
  const exploreBtn = document.querySelector('.hero-buttons .btn-outline');
  const scrollDownBtn = document.querySelector('.scroll-down-btn');
  
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
      // Scroll to features section or show more information
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
  
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
}

// Login Form Handler
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const role = document.getElementById('role').value;

  if (!username || !role) {
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