(() => {
  const errorMessage = document.getElementById('errorMessage');
  const form = document.querySelector('main form');
  const product_id = shared.getIdFromQuery();

  errorMessage.style.display = 'none';

  form.addEventListener('submit', formSubmitted);

  shared.getProduct(product_id).then(populateFormWithProduct);

  function formSubmitted(e) {
    e.preventDefault();

    const product = shared.validateFormSendProduct(
      form,
      errorMessage,
      updateProduct
    );

    if (product) {
      console.log(('product: ', product));
      updateProduct(product).then(() => {
        window.location = `/product.html?id=${product_id}`;
      });
    }
  }

  function populateFormWithProduct(product) {
    document.getElementById('title').value = product.title;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('image').value = product.image;
  }

  function updateProduct(product) {
    const options = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    };
    return fetch(`${shared.API_URL}/${product_id}`, options).then((result) =>
      result.json()
    );
  }
})();
