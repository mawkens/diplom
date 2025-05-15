document.addEventListener('DOMContentLoaded', function() {
  // Переключение между вкладками
  const menuItems = document.querySelectorAll('.account-menu li');
  const tabContents = document.querySelectorAll('.tab-content');
  
  menuItems.forEach(item => {
    if(item.classList.contains('logout')) return;
    
    item.addEventListener('click', function() {
      // Удаляем активные классы
      menuItems.forEach(i => i.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Добавляем активные классы
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Редактирование профиля
  const profileForm = document.querySelector('.profile-form');
  if(profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Изменения сохранены!');
      // Здесь будет AJAX-запрос на сервер
    });
  }

  // Управление платежными картами
  document.querySelectorAll('.btn-remove-card').forEach(btn => {
    btn.addEventListener('click', function() {
      if(confirm('Удалить эту карту?')) {
        this.closest('.payment-card').remove();
      }
    });
  });

  // Добавление новой карты
  const paymentForm = document.querySelector('.add-payment-form');
  if(paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Карта успешно добавлена!');
      // Здесь будет AJAX-запрос на сервер
    });
  }

  // Избранное
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.wishlist-item').remove();
    });
  });

  // Выход из аккаунта
  document.querySelector('.logout').addEventListener('click', function() {
    if(confirm('Вы уверены, что хотите выйти?')) {
      // Очистка данных и редирект
      localStorage.removeItem('authToken');
      window.location.href = 'index.html';
    }
  });
});