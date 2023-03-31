import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

function hideLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

function showError() {
  const errorMsg = document.createElement('h1');
  errorMsg.classList.add('error');
  errorMsg
    .textContent = 'Algum erro ocorreu, recarregue a página e tente novamente';
  const products = document.querySelector('.products');

  products.appendChild(errorMsg);
}

async function renderProduts() {
  try {
    const productList = await fetchProductsList('computador');
    const productsSection = document.querySelector('.products');
    hideLoading();
    if (productList) {
      productList.forEach((product) => {
        const section = createProductElement(product);
        productsSection.appendChild(section);
        section.addEventListener('click', async (e) => {
          if (e.target.className === 'product__add') {
            console.log('cliquei no produto', e);
            const idElement = e.target.parentNode.querySelector('.product__id').innerText;
            console.log(idElement);
            saveCartID(idElement);
            const dataProduts = await fetchProduct(idElement);
            console.log(dataProduts);
            const loadCart = createCartProductElement(dataProduts);
            console.log(loadCart);
            document.querySelector('.cart__products').appendChild(loadCart);
          }
        });
      });
    }
  } catch (error) {
    showError();
  }
}
async function renderShopCart() {
  const cartIds = getSavedCartIDs();
  console.log(cartIds);
  const cartPromises = cartIds.map((cartId) => fetchProduct(cartId));
  const shoppingCartproducts = await Promise.all(cartPromises);
  console.log(shoppingCartproducts);
  shoppingCartproducts.forEach((shoppingCartproduct) => {
    const cartProductElement = createCartProductElement(shoppingCartproduct);
    console.log(cartProductElement);
    document.querySelector('.cart__products').appendChild(cartProductElement);
  });

  const sumProducts = shoppingCartproducts.reduce((acc, cv) => acc + cv.price, 0);
  console.log(sumProducts);
  document.querySelector('.total-price').innerText = sumProducts;
}

renderProduts();

renderShopCart();
