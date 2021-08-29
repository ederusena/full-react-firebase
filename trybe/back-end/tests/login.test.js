const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Sua aplicação deve ter o endpoint POST `/login`', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
        password: '12345678',
      })
      .expect('status', 200);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.token).not.toBeNull();
  });

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        password: '12345678',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Todos os campos devem ser preenchidos!');
  });

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Todos os campos devem ser preenchidos!');
  });

  it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: '',
        password: '12345678',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Todos os campos devem ser preenchidos!');
  });

  it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
        password: '',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Todos os campos devem ser preenchidos!');
  });

  it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'menorIdade@gmail.com',
        password: '12345678',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email não encontrado.');
  });
  it('Será validado que não é possível fazer login com um password incorreto', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
        password: '123456789',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email e/ou password incorretos.');
  });
  it('Será validado que não é possível fazer login com um password menor que 6 caracteres', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebirita@gmail.com',
        password: '12345',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Senha inválida.');
  });
  it('Será validado que não é possível fazer login com um email com email inválido', async () => {
    const response = await frisby
      .post(`${url}/login`, {
        email: 'zebiritagmail.com',
        password: '12345',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email inválido.');
  });
});
