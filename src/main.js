import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');
const createProductList = async (product) => {
  const response = await fetchProductsList(product);
  response.forEach((element) => {
    sectionProducts.appendChild(createProductElement(element));
  });
};
function showLoading() {
  const loadingElement = document.createElement('div');
  loadingElement.innerText = 'Carregando...';
  loadingElement.classList.add('loading');
  document.body.appendChild(loadingElement);
}

function hideLoading() {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    document.body.removeChild(loadingElement);
  }
}
window.onload = async () => {
  await createProductList('computador');
};
