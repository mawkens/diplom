// Глобальный массив продуктов
window.products = [
  { 
    id: 1, 
    name: "Смартфон PixelNova X", 
    price: 29990, 
    img: "images/6609432673.jpg", 
    category: "phones",
    description: "Флагманский смартфон с лучшей камерой",
    specs: "6.5\" AMOLED, 128ГБ, 8ГБ ОЗУ",
    reviews: ["Отличный телефон!", "Камера просто супер!"]
  },
  { 
    id: 2, 
    name: "Ноутбук ZBook Pro", 
    price: 65990, 
    img: "images/6827147955.jpg", 
    category: "laptops",
    description: "Мощный ноутбук для работы и игр",
    specs: "Intel i7, 16ГБ, SSD 512ГБ, NVIDIA RTX 3050",
    reviews: ["Быстрый и надежный."] 
  },
  { 
    id: 3, 
    name: "Наушники AirSound Pro", 
    price: 5990, 
    img: "images/6088634008.jpg", 
    category: "accessories",
    description: "Беспроводные наушники с шумоподавлением",
    specs: "Bluetooth 5.0, автономность 30ч",
    reviews: ["Звук на высоте!"] 
  }
];

// Инициализация избранного при загрузке
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }
  updateCartCounter();
});

// Функция добавления в корзину
window.addToCart = function(productId, redirect = false) {
  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();

  if (redirect) {
    window.location.href = 'cart.html';
  } else {
    showNotification('Товар добавлен в корзину!');
  }
};

// Обновление счетчика корзины
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-counter').forEach(el => {
    el.textContent = totalItems > 0 ? totalItems : '';
  });
}

// Показать уведомление
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
// Проверка авторизации при загрузке страницы
function checkAuth() {
  const authToken = localStorage.getItem('authToken');
  if(!authToken && window.location.pathname.includes('account.html')) {
    window.location.href = 'login.html';
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
  checkAuth();
  
  // Если на странице account.html, загружаем данные пользователя
  if(window.location.pathname.includes('account.html')) {
    loadUserData();
  }
});

function loadUserData() {
  // Здесь будет загрузка данных пользователя с сервера
  // Пример:
  /*
  fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      document.querySelector('.username').textContent = data.name;
      // Заполняем другие поля
    });
  */
}// Показ/скрытие форм входа и регистрации
document.addEventListener('DOMContentLoaded', function() {
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if(showRegister && showLogin) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'flex';
    });
    
    showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      registerForm.style.display = 'none';
      loginForm.style.display = 'flex';
    });
  }

  // Обработка формы входа
  if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;
      
      // Здесь будет AJAX-запрос на сервер
      console.log('Вход:', email, password);
      localStorage.setItem('authToken', 'demo-token');
      window.location.reload();
    });
  }

  // Обработка формы регистрации
  if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelectorAll('input[type="password"]')[0].value;
      const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
      
      if(password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      
      // Здесь будет AJAX-запрос на сервер
      console.log('Регистрация:', name, email, password);
      localStorage.setItem('authToken', 'demo-token');
      window.location.href = 'account.html';
    });
  }

  // Обновление кнопки входа если пользователь авторизован
  updateAuthButton();
});

function updateAuthButton() {
  const authBtn = document.querySelector('.btn-auth');
  if(!authBtn) return;
  
  if(localStorage.getItem('authToken')) {
    authBtn.innerHTML = `
      <img src="images/user-icon.svg" alt="Аккаунт">
      <span>Мой профиль</span>
    `;
    authBtn.onclick = function() {
      window.location.href = 'account.html';
    };
  } else {
    authBtn.onclick = null;
  }
}