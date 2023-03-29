export const fetchProduct = () => {
  if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
    };
  }
};

export const fetchProductsList = async (product) => {
  if (!product) throw new Error('Termo de busca não informado');

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await response.json();
  return data.results;
};

const cartProductsList = document.querySelector('.cart__products');

function addToCart(productId) {
  saveCartID(productId);

  then((product) => {
    const cartProductElement = createCartProductElement(product);

    cartProductsList.appendChild(cartProductElement);
  })
    .catch((error) => {
      console.error(error);
    });
}

const addToCartButton = document.querySelector('.add-to-cart-button');

addToCartButton.addEventListener('click', () => addToCart(productId));
