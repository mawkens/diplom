document.addEventListener('DOMContentLoaded', function() {
  // Загрузка товаров (в реальном приложении - AJAX-запрос)
  const products = [
    {
      id: 1,
      name: "Смартфон PixelNova X",
      price: 29990,
      category: "phones",
      image: "images/phone.jpg",
      description: "Флагманский смартфон с лучшей камерой"
    },
    // Другие товары...
  ];

  // Отображение товаров
  function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = productsToRender.map(product => `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <div class="price">${product.price.toLocaleString('ru-RU')} ₽</div>
        <button class="btn" onclick="addToCart(${product.id})">В корзину</button>
        <a href="product.html?id=${product.id}" class="btn btn-outline">Подробнее</a>
      </div>
    `).join('');
  }

  // Фильтрация товаров
  function filterProducts() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    const category = document.querySelector('.category-filter').value;
    
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                          product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'all' || product.category === category;
      
      return matchesSearch && matchesCategory;
    });
    
    renderProducts(filtered);
  }

  // Инициализация
  renderProducts(products);
  
  // События
  document.querySelector('.search-box button').addEventListener('click', filterProducts);
  document.querySelector('.category-filter').addEventListener('change', filterProducts);
});