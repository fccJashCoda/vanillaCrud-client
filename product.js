(() => {
  const productSection = document.querySelector('main section');
  const product_id = shared.getIdFromQuery();

  // getProducts().then(showProducts);
  shared.getProduct(product_id).then(showProduct);

  function showProduct(product) {
    const buttons = `
    <a href="/edit.html?id=${product.id}" class="btn btn-success">Edit Product</a>
    <button id="delete" class="btn btn-danger">Delete Product</button>`;
    shared.addProductToPage(product, 12, productSection, buttons);

    document.getElementById('delete').addEventListener('click', () => {
      deleteProduct(product_id).then(() => {
        window.location = '/';
      });
    });
  }

  function deleteProduct(id) {
    const options = {
      method: 'DELETE',
    };
    return fetch(`${shared.API_URL}/${id}`, options);
  }
})();
