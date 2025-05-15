function renderCatalog() {
  const container = document.getElementById('catalog');
  if (!container) return;
  
  container.innerHTML = '';
  
  const category = document.getElementById('category-filter').value;
  const searchTerm = document.getElementById('search-box').value.toLowerCase();
  
  const filteredProducts = window.products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                         (product.description && product.description.toLowerCase().includes(searchTerm));
    return matchesCategory && matchesSearch;
  });
  
  if (filteredProducts.length === 0) {
    container.innerHTML = '<p class="no-products">Товары не найдены</p>';
    return;
  }
  
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    const rating = (Math.random() * 0.5 + 4.5).toFixed(1);
    const reviewsCount = Math.floor(Math.random() * 5000) + 100;
    const oldPrice = Math.round(product.price * (1 + Math.random() * 0.3));
    const discount = Math.round((1 - product.price / oldPrice) * 100);
    
    productCard.innerHTML = `
      <a href="product.html?id=${product.id}" class="product-link">
        <div class="product-image-container">
          <img src="${product.img}" alt="${product.name}" style="max-width:100%; max-height:100%; object-fit:contain;">
          <div class="product-badge">${Math.random() > 0.5 ? 'Топ' : 'Акция'}</div>
        </div>
        <div class="product-rating">
          <span class="product-rating-stars">${'★'.repeat(5)}</span>
          <span class="product-rating-count">${rating} (${reviewsCount})</span>
        </div>
        <div class="product-price-container">
          <span class="product-price">${product.price.toLocaleString('ru-RU')}₽</span>
          <span class="product-old-price">${oldPrice.toLocaleString('ru-RU')}₽</span>
          <span class="product-sale">-${discount}%</span>
        </div>
        <div class="product-title">${product.name}</div>
      </a>
      <div class="product-actions">
        <button class="btn-favorite" data-id="${product.id}">♥</button>
        <button class="btn-cart" onclick="event.stopPropagation(); window.addToCart(${product.id})">В корзину</button>
      </div>
    `;
    container.appendChild(productCard);
  });
  
  // Обработчик для кнопок избранного
  document.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const productId = parseInt(this.dataset.id);
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      if (this.classList.contains('active')) {
        favorites = favorites.filter(id => id !== productId);
      } else {
        favorites.push(productId);
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.classList.toggle('active');
    });
    
    // Проверяем, есть ли товар в избранном
    const productId = parseInt(btn.dataset.id);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(productId)) {
      btn.classList.add('active');
    }
  });
}

// Инициализация фильтров
document.getElementById('category-filter').addEventListener('change', renderCatalog);
document.getElementById('search-box').addEventListener('input', renderCatalog);

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', renderCatalog);