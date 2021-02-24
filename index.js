(() => {
  const productSection = document.querySelector('main section');
  const API_URL = 'http://localhost:3000/api/v1/products';

  // getProducts().then(showProducts);
  getProducts().then(showProducts);

  function getProducts() {
    return fetch(API_URL).then((res) => res.json());
  }

  function showProducts(products) {
    console.log(products);
    products.forEach((product) => {
      const card = document.createElement('div');
      productSection.appendChild(card);

      card.outerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">$${product.price}</p>
            <a href="/product.html?id=${product.id}" class="btn btn-primary">View Product</a>
          </div>
        </div>
      `;
    });
  }
})();
