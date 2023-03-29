import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
const { fetchProductsList } = require('./fetchFunctions');

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    await fetchProductsList();

    expect(fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    await fetchProductsList();

    expect(fetch).toHaveBeenCalledWith('https://exemplo.com/api/products');

    global.fetch.mockClear();
    delete global.fetch;
  });
});

// it('...', () => {
  // });