const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

const { listaProdutos } = require('./listProducts');

const logMeIn = async (endPoint = 'login', status = 200) => {
  const response = await frisby
    .post(`${url}/${endPoint}`, {
      name: 'Usuario novinho',
      email: 'usuario@novo.com',
      password: '12345678',
      role: 'client',
    })
    .expect('status', status);
  const { body } = response;
  const result = JSON.parse(body);
  return result.token;
};

describe('Sua aplicação deve ter o endpoint GET `/products`', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que a resposta da endpoint não é nula', async () => {
    const token = await logMeIn('register', 201);
    const response = await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result).not.toBeNull();
  });
  it('Será validado que o tamanho do array de produtos da resposta do endpoint não é zero', async () => {
    const token = await logMeIn();
    const response = await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.length).not.toBe(0);
  });
  it('Será validado que o tamanho do array de produtos da resposta do endpoint é onze', async () => {
    const token = await logMeIn();
    const response = await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.length).toBe(11);
  });
  it('Será validado que não é possível ver os produtos se o usuário não estiver logado', async () => {
    const response = await frisby.get(`${url}/products`).expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('No autorization.');
  });
  it('Será validado que a lista de produtos recebidas é igual a lista de produtos esperada', async () => {
    const token = await logMeIn();
    const response = await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/products`)
      .expect('status', 200);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result).toEqual(listaProdutos);
  });
});
