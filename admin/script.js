const adminCredentials = {
  email: 'admin@unlimitedtopup.com',
  password: 'Admin@2026',
};

const orders = [
  { id: 'UT-1001', user: 'Sakib Ahmed', uid: '90987612', package: '25 Diamond', amount: 210, method: 'bKash', status: 'Approved' },
  { id: 'UT-1002', user: 'Nabila Islam', uid: '67890123', package: 'Weekly Membership', amount: 150, method: 'Nagad', status: 'Processing' },
  { id: 'UT-1003', user: 'Mahin Hasan', uid: '43219876', package: 'FF ID Like', amount: 199, method: 'Rocket', status: 'Pending' },
  { id: 'UT-1004', user: 'Asif Rahman', uid: '33456789', package: 'Level Up Pass', amount: 180, method: 'bKash', status: 'Cancelled' },
  { id: 'UT-1005', user: 'Tisha Akter', uid: '12090911', package: 'Monthly Membership', amount: 350, method: 'Nagad', status: 'Approved' },
  { id: 'UT-1006', user: 'Rafid Hoque', uid: '77123467', package: 'Weekly Lite', amount: 99, method: 'Rocket', status: 'Processing' },
  { id: 'UT-1007', user: 'Jahid Karim', uid: '22114790', package: 'Social Media Boost', amount: 520, method: 'bKash', status: 'Pending' },
  { id: 'UT-1008', user: 'Mim Akter', uid: '44132476', package: 'Season Pass', amount: 290, method: 'Nagad', status: 'Approved' },
];

const users = [
  { name: 'Sakib Ahmed', email: 'sakib@email.com', phone: '+8801712345678', wallet: 1000, joined: '2025-08-10', status: 'Active' },
  { name: 'Nabila Islam', email: 'nabila@email.com', phone: '+8801911223344', wallet: 760, joined: '2025-09-11', status: 'Active' },
  { name: 'Asif Rahman', email: 'asif@email.com', phone: '+8801811122233', wallet: 320, joined: '2025-10-02', status: 'Blocked' },
  { name: 'Mahin Hasan', email: 'mahin@email.com', phone: '+8801515566677', wallet: 1445, joined: '2025-11-28', status: 'Active' },
  { name: 'Tisha Akter', email: 'tisha@email.com', phone: '+8801722334455', wallet: 870, joined: '2025-12-15', status: 'Active' },
  { name: 'Rafid Hoque', email: 'rafid@email.com', phone: '+8801600100200', wallet: 510, joined: '2026-01-04', status: 'Active' },
];

const payments = [
  { trx: 'TRX-4091', user: 'Raiyan', sender: '+8801711009900', method: 'bKash', amount: 500, status: 'Pending' },
  { trx: 'TRX-4128', user: 'Mim', sender: '+8801814556611', method: 'Nagad', amount: 1000, status: 'Pending' },
  { trx: 'TRX-4153', user: 'Nipa', sender: '+8801715842901', method: 'Rocket', amount: 750, status: 'Approved' },
  { trx: 'TRX-4175', user: 'Fahim', sender: '+8801909785112', method: 'bKash', amount: 320, status: 'Rejected' },
];

const products = [
  { name: '25 Diamond', category: 'Diamonds', price: 210, tag: 'Best Value', active: 'Active' },
  { name: 'Weekly Membership', category: 'Memberships', price: 150, tag: 'Hot', active: 'Active' },
  { name: 'Monthly Membership', category: 'Memberships', price: 350, tag: 'Popular', active: 'Active' },
  { name: 'FF ID Like', category: 'Likes', price: 199, tag: 'New', active: 'Inactive' },
  { name: 'Level Up Pass', category: 'Level Up', price: 180, tag: 'Limited', active: 'Active' },
  { name: 'Social Media Boost', category: 'Likes', price: 520, tag: 'VIP', active: 'Active' },
];

const metrics = [
  { label: 'Total Users', value: '24.8K', change: '+12.4%', type: 'up', icon: '👥' },
  { label: 'Total Orders Today', value: '1,248', change: '+8.2%', type: 'up', icon: '🧾' },
  { label: 'Total Revenue', value: '৳ 1,85,420', change: '+18.6%', type: 'up', icon: '💰' },
  { label: 'Pending Orders', value: '312', change: '-4.1%', type: 'down', icon: '⏳' },
];

const pageStyles = {
  overview: '#overview',
  orders: '#orders',
  users: '#users',
  payments: '#payments',
  products: '#products',
  banners: '#banners',
  security: '#security',
};

function getStatusClass(status) {
  const normalized = String(status).toLowerCase();
  if (normalized.includes('approved') || normalized.includes('done') || normalized.includes('active')) return 'approved';
  if (normalized.includes('pending') || normalized.includes('processing')) return 'pending';
  return 'cancelled';
}

function renderStats() {
  const container = document.getElementById('statsGrid');
  if (!container) return;

  container.innerHTML = metrics.map((metric) => `
    <div class="metric-card">
      <div class="meta">
        <span>${metric.label}</span>
        <span class="metric-ico" style="background:${metric.type === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}">${metric.icon}</span>
      </div>
      <h3>${metric.value}</h3>
      <div class="trend ${metric.type}">${metric.change}</div>
      <small>vs last period</small>
    </div>
  `).join('');
}

function renderRecentOrders() {
  const table = document.getElementById('recentOrdersTable');
  if (!table) return;

  table.innerHTML = orders.slice(0, 4).map((order) => `
    <tr>
      <td>${order.id}</td>
      <td>${order.user}</td>
      <td>${order.package}</td>
      <td>৳${order.amount}</td>
      <td>${order.method}</td>
      <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
    </tr>
  `).join('');
}

function renderOrdersTable(searchTerm = '') {
  const table = document.getElementById('ordersTable');
  if (!table) return;

  const filtered = orders.filter((order) => {
    const query = searchTerm.toLowerCase();
    return !query || [order.id, order.user, order.uid, order.package, order.method, order.status].some(value => String(value).toLowerCase().includes(query));
  });

  table.innerHTML = filtered.map((order) => `
    <tr>
      <td>${order.id}</td>
      <td>${order.user}</td>
      <td>${order.uid}</td>
      <td>${order.package}</td>
      <td>৳${order.amount}</td>
      <td>${order.method}</td>
      <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
      <td>
        <div class="action-row">
          <button class="small-btn approve" data-action="approve-order" data-id="${order.id}">Approve</button>
          <button class="small-btn process" data-action="process-order" data-id="${order.id}">Process</button>
          <button class="small-btn cancel" data-action="cancel-order" data-id="${order.id}">Cancel</button>
        </div>
      </td>
    </tr>
  `).join('');

  renderPagination('ordersPagination', filtered.length, 5);
}

function renderUsersTable(searchTerm = '') {
  const table = document.getElementById('usersTable');
  if (!table) return;

  const filtered = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return !query || [user.name, user.email, user.phone, user.status].some(value => String(value).toLowerCase().includes(query));
  });

  table.innerHTML = filtered.map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>৳${user.wallet}</td>
      <td>${user.joined}</td>
      <td><span class="status-badge ${getStatusClass(user.status)}">${user.status}</span></td>
      <td>
        <div class="action-row">
          <button class="small-btn edit" data-action="edit-user" data-name="${user.name}">Edit</button>
          <button class="small-btn approve" data-action="wallet-add" data-name="${user.name}">Add</button>
          <button class="small-btn cancel" data-action="wallet-deduct" data-name="${user.name}">Deduct</button>
        </div>
      </td>
    </tr>
  `).join('');

  renderPagination('usersPagination', filtered.length, 5);
}

function renderPaymentsTable() {
  const table = document.getElementById('paymentsTable');
  if (!table) return;

  table.innerHTML = payments.map((payment) => `
    <tr>
      <td>${payment.trx}</td>
      <td>${payment.user}</td>
      <td>${payment.sender}</td>
      <td>${payment.method}</td>
      <td>৳${payment.amount}</td>
      <td><span class="status-badge ${getStatusClass(payment.status)}">${payment.status}</span></td>
      <td>
        <div class="action-row">
          <button class="small-btn approve" data-action="approve-payment" data-trx="${payment.trx}">Approve</button>
          <button class="small-btn cancel" data-action="reject-payment" data-trx="${payment.trx}">Reject</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = products.map((product) => `
    <article class="product-card-admin">
      <div class="product-top">
        <div class="product-label">${product.tag}</div>
        <button class="small-btn edit" data-action="edit-product" data-name="${product.name}">Edit</button>
      </div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <div class="meta-stack">
        <div class="meta-row-inline"><span>Stock</span><strong>48 Units</strong></div>
        <div class="meta-row-inline"><span>Status</span><strong><span class="status-badge ${getStatusClass(product.active)}">${product.active}</span></strong></div>
      </div>
      <div class="product-actions">
        <span class="price-tag">৳${product.price}</span>
        <button class="small-btn approve" data-action="toggle-product" data-name="${product.name}">Toggle</button>
      </div>
    </article>
  `).join('');
}

function renderPagination(elementId, total, perPage = 5) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  container.innerHTML = Array.from({ length: totalPages }, (_, index) => `
    <button class="page-number ${index === 0 ? 'active' : ''}" type="button">${index + 1}</button>
  `).join('');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function bindNavigation() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.section;
      document.querySelectorAll('.page-section').forEach((section) => {
        section.classList.toggle('active', section.id === target);
      });
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item === button));
    });
  });

  document.querySelectorAll('[data-section]').forEach((element) => {
    if (element.dataset.section && !element.classList.contains('nav-item')) {
      element.addEventListener('click', () => {
        const target = element.dataset.section;
        document.querySelectorAll('.page-section').forEach((section) => {
          section.classList.toggle('active', section.id === target);
        });
        document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.section === target));
      });
    }
  });
}

function bindModalActions() {
  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openModal));
  });

  document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) closeModal(modal.id);
    });
  });

  window.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains('modal')) {
      closeModal(target.id);
    }
  });
}

function bindButtons() {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const action = target.dataset.action;
    if (!action) return;

    if (action === 'approve-order') {
      const orderId = target.dataset.id;
      const order = orders.find((entry) => entry.id === orderId);
      if (order) order.status = 'Approved';
      renderOrdersTable(document.getElementById('orderSearch')?.value || '');
      renderRecentOrders();
    }

    if (action === 'process-order') {
      const orderId = target.dataset.id;
      const order = orders.find((entry) => entry.id === orderId);
      if (order) order.status = 'Processing';
      renderOrdersTable(document.getElementById('orderSearch')?.value || '');
      renderRecentOrders();
    }

    if (action === 'cancel-order') {
      const orderId = target.dataset.id;
      const order = orders.find((entry) => entry.id === orderId);
      if (order) order.status = 'Cancelled';
      renderOrdersTable(document.getElementById('orderSearch')?.value || '');
      renderRecentOrders();
    }

    if (action === 'approve-payment') {
      const trx = target.dataset.trx;
      const payment = payments.find((entry) => entry.trx === trx);
      if (payment) payment.status = 'Approved';
      renderPaymentsTable();
    }

    if (action === 'reject-payment') {
      const trx = target.dataset.trx;
      const payment = payments.find((entry) => entry.trx === trx);
      if (payment) payment.status = 'Rejected';
      renderPaymentsTable();
    }

    if (action === 'edit-user') {
      openModal('userModal');
    }

    if (action === 'wallet-add') {
      const userName = target.dataset.name;
      const user = users.find((entry) => entry.name === userName);
      if (user) user.wallet += 100;
      renderUsersTable(document.getElementById('userSearch')?.value || '');
    }

    if (action === 'wallet-deduct') {
      const userName = target.dataset.name;
      const user = users.find((entry) => entry.name === userName);
      if (user) user.wallet = Math.max(0, user.wallet - 100);
      renderUsersTable(document.getElementById('userSearch')?.value || '');
    }

    if (action === 'edit-product') {
      openModal('productModal');
    }

    if (action === 'toggle-product') {
      const productName = target.dataset.name;
      const product = products.find((entry) => entry.name === productName);
      if (product) product.active = product.active === 'Active' ? 'Inactive' : 'Active';
      renderProducts();
    }
  });

  document.getElementById('saveNoticeBtn')?.addEventListener('click', () => {
    const noticeText = document.getElementById('noticeText');
    const bannerTitle = document.getElementById('bannerTitle');
    const bannerSubtitle = document.getElementById('bannerSubtitle');
    const bannerCta = document.getElementById('bannerCta');
    const bannerActive = document.getElementById('bannerActive');

    alert(`Homepage notice and banner settings saved:\n\n${noticeText.value}\n\n${bannerTitle.value} | ${bannerSubtitle.value} | ${bannerActive.checked ? 'Active' : 'Inactive'} | CTA: ${bannerCta.value}`);
  });
}

function bindSearch() {
  const orderSearch = document.getElementById('orderSearch');
  const userSearch = document.getElementById('userSearch');

  orderSearch?.addEventListener('input', (event) => {
    renderOrdersTable(event.target.value);
  });

  userSearch?.addEventListener('input', (event) => {
    renderUsersTable(event.target.value);
  });
}

function bindForms() {
  document.getElementById('orderForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const order = {
      id: `UT-${Math.floor(1000 + Math.random() * 9000)}`,
      user: formData.get('userName') || 'New User',
      uid: formData.get('gameUid') || '00000000',
      package: formData.get('packageName') || 'Top Up',
      amount: Number(formData.get('amount')) || 0,
      method: formData.get('method') || 'bKash',
      status: formData.get('status') || 'Pending',
    };
    orders.unshift(order);
    renderOrdersTable();
    renderRecentOrders();
    event.target.reset();
    closeModal('orderModal');
  });

  document.getElementById('userForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    users.unshift({
      name: formData.get('name') || 'New User',
      email: formData.get('email') || 'new@email.com',
      phone: formData.get('phone') || '+8801700000000',
      wallet: Number(formData.get('wallet')) || 0,
      joined: new Date().toISOString().slice(0, 10),
      status: 'Active',
    });
    renderUsersTable();
    event.target.reset();
    closeModal('userModal');
  });

  document.getElementById('productForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    products.unshift({
      name: formData.get('productName') || 'New Package',
      category: formData.get('category') || 'Diamonds',
      price: Number(formData.get('price')) || 0,
      tag: formData.get('discount') || 'New',
      active: formData.get('active') || 'Active',
    });
    renderProducts();
    event.target.reset();
    closeModal('productModal');
  });
}

function bindAdminAuth() {
  const isLoggedIn = localStorage.getItem('utAdminLoggedIn') === 'true';
  if (!isLoggedIn && window.location.pathname.includes('index.html')) {
    window.location.href = 'login.html';
  }

  const loginForm = document.getElementById('adminLoginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const error = document.getElementById('authError');

    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('utAdminLoggedIn', 'true');
      localStorage.setItem('utAdminUser', email);
      window.location.href = 'index.html';
      return;
    }

    error.textContent = 'Invalid admin credentials. Please try again.';
    error.hidden = false;
  });

  document.querySelector('.logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('utAdminLoggedIn');
    localStorage.removeItem('utAdminUser');
    window.location.href = 'login.html';
  });
}

function init() {
  renderStats();
  renderRecentOrders();
  renderOrdersTable();
  renderUsersTable();
  renderPaymentsTable();
  renderProducts();
  bindNavigation();
  bindModalActions();
  bindButtons();
  bindSearch();
  bindForms();
  bindAdminAuth();
}

document.addEventListener('DOMContentLoaded', init);














































