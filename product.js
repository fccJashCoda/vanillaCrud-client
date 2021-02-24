(() => {
  const productSection = document.querySelector('main section');
  const product_id = shared.getIdFromQuery();

  // getProducts().then(showProducts);
  getProduct(product_id).then(showProduct);

  function getProduct(id) {
    return fetch(shared.API_URL + `/${product_id}`).then((res) => res.json());
  }

  function showProduct(product) {
    const buttons = `<a href="/product.html?id=${product.id}" class="btn btn-success">Edit Product</a>`;
    shared.addProductToPage(product, 12, productSection, buttons);
  }
})();
