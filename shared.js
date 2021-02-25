const shared = (() => {
  const API_URL = 'http://localhost:3000/api/v1/products';

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

  function getIdFromQuery() {
    const regex = /\?id=([0-9]+)/;
    const parts = window.location.search.match(regex);
    return parts[1];
  }

  function getProduct(id) {
    return fetch(shared.API_URL + `/${id}`).then((res) => res.json());
  }

  function validateFormSendProduct(form, errorMessage) {
    const formData = new FormData(form);
    const title = formData.get('title');
    const price = Number(formData.get('price'));
    const quantity = Number(formData.get('quantity'));

    if (title.trim() == '') {
      errorMessage.textContent = 'Title is required.';
      errorMessage.style.display = '';
      return;
    }
    if (isNaN(price) || price <= 0) {
      errorMessage.textContent =
        'Price is required and needs to be greater than $0.';
      errorMessage.style.display = '';
      return;
    }
    if (isNaN(quantity) || quantity < 0) {
      errorMessage.textContent =
        'Quantity is required and needs to be 0 or greater.';
      errorMessage.style.display = '';
      return;
    }

    return {
      title,
      description: formData.get('description'),
      price,
      quantity,
      image: formData.get('image'),
    };
  }

  return {
    API_URL,
    addProductToPage,
    getIdFromQuery,
    getProduct,
    validateFormSendProduct,
  };
})();
