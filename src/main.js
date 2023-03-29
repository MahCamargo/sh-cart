import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

// iniciando projeto

function hildeLoading() {
  const loadings = document.getElementsByClassName('loading');
  const erros = document.getElementsByClassName('error');
  if (loadings.length) {
    loadings[0].remove();
  }
  if (erros.length) {
    erros[0].remove();
  }
}

function showLoading() {
  const div = document.createElement('div');
  div.classList.add('loading');
  const label = document.createElement('label');
  label.innerText = 'carregando';

  div.appendChild(label);
}

const erroAPI = async () => {
  try {
    showLoading();
    await fetchProductsList('computador');
  } catch (error) {
    const divError = document.createElement('div');
    divError.classList = 'error';
    const label = document.createElement('label');
    label.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    divError.appendChild(label);
    document.body.appendChild(divError);
  }
};

const fetchData = async () => {
  const results = await fetchProductsList('computador');
  showLoading();
  const html = document.querySelector('.products');
  console.log(html);
  results.forEach((element) => { html.appendChild(createProductElement(element)); });
  hildeLoading();
};

fetchData();
showLoading();
erroAPI();

const cartProductsList = document.querySelector('.cart__products');

function addToCart(productId) {
  // Salva o ID do produto no localStorage
  saveCartID(productId);

  // Faz a requisição para buscar os detalhes do produto
  fetchProduct(productId)
    .then((product) => {
      // Cria o elemento HTML para o produto no carrinho
      const cartProductElement = createCartProductElement(product);

      // Adiciona o elemento como filho da lista de produtos do carrinho
      cartProductsList.appendChild(cartProductElement);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Adiciona um evento de clique ao botão "Adicionar ao carrinho"
const addToCartButton = document.querySelector('.add-to-cart-button');

addToCartButton.addEventListener('click', () => addToCart(productId));
