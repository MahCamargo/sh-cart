import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';
// implemente seus testes aqui
describe('Teste a função fetchProduct',  () => {
  it('fetchproduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('fetchProduct com o argumento do produto "MLB1405519561" e teste se fetch foi chamada', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledTimes(1)
  });
  it('fetchProduct com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1405519561")
  });
  it('testa fetchProduct com o argumento MLB1405519561 retorna os dados de product', async () => {
    const result = await fetchProduct('MLB1405519561');
    expect(result).toEqual(product);
  });

  it('fetchProduct deve retornar um erro com a mensagem "ID não informado" caso não entregue parâmetro', async () => {
    await expect(fetchProduct()).rejects.toEqual(new Error('ID não informado'));
  })

});