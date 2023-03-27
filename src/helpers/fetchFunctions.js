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
