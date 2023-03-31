export const fetchProduct = async (idProduct) => {
  if (!idProduct) throw new Error('ID não informado');
  const URL = `https://api.mercadolibre.com/items/${idProduct}`;
  const endPoint = await fetch(URL);
  const data = await endPoint.json();
  console.log(data);
  return data;
};

export const fetchProductsList = async (item) => {
  if (!item) throw new Error('Termo de busca não informado');
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const endPoint = await fetch(URL);
  const data = await endPoint.json();
  const listOfProducts = data.results;
  return listOfProducts;
};
