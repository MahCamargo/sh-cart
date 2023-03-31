import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';
// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('testa fetchProductsList com o argumento computador se fetch foi chamada', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  });

  it('testa fetchProductsList com o argumento computador se fetch foi chamada com URL correto', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('testa fetchProductsList com o argumento computador retorna os dados de computadorSearch', async () => {
    const result = await fetchProductsList('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('should return a error if is invalid action', async () => {
    const result = await fetchProductsList()
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toEqual('Termo de busca não informado');
    })

})


  
