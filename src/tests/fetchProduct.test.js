import './mocks/fetchSimulator';
import { fetchProduct, fetchProductsList } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Teste se fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe("function");

  });
  it(" Testa se fetch foi chamada,executando a função fetchProductsList com o argumento 'computador'",async () => {
    await fetchProductsList("computador")
    expect(fetch).toHaveBeenCalled();

  });

  it("Teste se, ao chamar a função fetchProductsList com o argumento 'computador', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/sites/MLB/search?q=computador';", async () => {
    await fetchProductsList("computador");
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it("Teste se o retorno da função fetchProductsList com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo", async () => {
   const data = await fetchProductsList("computador");
    expect(data).toEqual(product)

  });

  it("Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: 'Termo de busca não informado'", async () => {
    await expect(fetchProductsList()).rejects.toThrow(new Error('Termo de busca não informado'))

  });

});


describe('fetchProduct', () => {
  
  it('Deve ser uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Deve chamar a função fetch', () => {
    const fetch = jest.fn();
    fetchProduct('MLB1405519561', fetch);
    expect(fetch).toHaveBeenCalled();
  });

  it('Deve chamar a função fetch com o endpoint correto', () => {
    const fetch = jest.fn();
    fetchProduct('MLB1405519561', fetch);
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Deve retornar um objeto igual ao objeto produto', async () => {
    const fetch = jest.fn(() => Promise.resolve({ json: () => produto }));
    const result = await fetchProduct('MLB1405519561', fetch);
    expect(result).toEqual(produto);
  });

  it('Deve lançar um erro ao chamar a função sem argumento', async () => {
    const fetch = jest.fn(() => Promise.resolve({ json: () => produto }));
    await expect(fetchProduct(undefined, fetch)).rejects.toThrow('ID não informado');
  });
});
