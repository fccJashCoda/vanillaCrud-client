const shared = (() => {
  const API_URL = 'http://localhost:3000/api/v1/products';

  function getIdFromQuery() {
    const regex = /\?id=([0-9]+)/;
    const parts = window.location.search.match(regex);
    return parts[1];
  }

  function addProductToPage(product, size, parent, buttons) {
    const card = document.createElement('div');
    parent.appendChild(card);

    card.outerHTML = `
        <div class="card col-sm-${size}">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">$ ${product.price}</p>
            <p class="card-text">${product.quantity} left in stock</p>
            ${buttons}
          </div>
        </div>
      `;
  }

  return {
    API_URL,
    getIdFromQuery,
    addProductToPage,
  };
})();
