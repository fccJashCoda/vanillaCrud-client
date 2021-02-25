(() => {
  const errorMessage = document.getElementById('errorMessage');
  const form = document.querySelector('main form');

  errorMessage.style.display = 'none';

  form.addEventListener('submit', formSubmitted);

  function formSubmitted(e) {
    e.preventDefault();

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

    const product = {
      title,
      description: formData.get('description'),
      price,
      quantity,
      image: formData.get('image'),
    };

    createProduct(product).then(
      (result) => (window.location = `/product.html?id=${result.id}`)
    );
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
