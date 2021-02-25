(() => {
  const productSection = document.querySelector('main section');
  const product_id = shared.getIdFromQuery();

  // getProducts().then(showProducts);
  shared.getProduct(product_id).then(showProduct);

  function showProduct(product) {
    const buttons = `<a href="/edit.html?id=${product.id}" class="btn btn-success">Edit Product</a>`;
    shared.addProductToPage(product, 12, productSection, buttons);
  }
})();
