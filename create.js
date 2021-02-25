(() => {
  const errorMessage = document.getElementById('errorMessage');
  const form = document.querySelector('main form');

  errorMessage.style.display = 'none';

  form.addEventListener('submit', formSubmitted);

  function formSubmitted(e) {
    e.preventDefault();

    const product = shared.validateFormSendProduct(
      form,
      errorMessage,
      createProduct
    );

    if (product) {
      createProduct(product).then(
        (result) => (window.location = `/product.html?id=${result.id}`)
      );
    }
  }

  function createProduct(product) {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    };
    return fetch(shared.API_URL, options).then((response) => response.json());
  }
})();
