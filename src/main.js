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
window.onload = async () => {
  await createProductList('smartphone');
};
