const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Sua aplicação deve ter o endpoint POST `/register`', () => {
  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer cadastro com sucesso como cliente sem passar role', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario@novo.com',
        password: '123456',
      })
      .expect('status', 201);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.token).not.toBeNull();
  });
  it('Será validado que é possível fazer cadastro com sucesso como cliente passando role', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario1@novo.com',
        password: '123456',
        role: 'client',
      })
      .expect('status', 201);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.token).not.toBeNull();
  });
  it('Será validado que é possível fazer cadastro com sucesso como administrator', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario2@novo.com',
        password: '123456',
        role: 'administrator',
      })
      .expect('status', 201);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.token).not.toBeNull();
  });
  it('Será validado que não é possível fazer cadastro sem o campo `name`', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        email: 'usuario3@novo.com',
        password: '123456',
        role: 'administrator',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe(
      'O nome deve conter, no mínimo, 12 letras, sem números ou caracteres especiais',
    );
  });
  it('Será validado que não é possível fazer register sem o campo `email`', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        password: '123456',
        role: 'administrator',
      })
      .expect('status', 400);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe(
      'Email inválido. Um email válido possui o formato <nome>@<domínio>',
    );
  });
  it('Será validado que não é possível fazer cadastro sem o campo `password`', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario4@novo.com',
        role: 'administrator',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email ou senha incorreto.');
  });

  it('Será validado que não é possível fazer register com o campo `name` em branco', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: '',
        email: 'usuario5@novo.com',
        password: '123456',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe(
      'O nome deve conter, no mínimo, 12 letras, sem números ou caracteres especiais',
    );
  });

  it('Será validado que não é possível fazer register com o campo `email` em branco', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: '',
        password: '123456',
      })
      .expect('status', 400);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe(
      'Email inválido. Um email válido possui o formato <nome>@<domínio>',
    );
  });

  it('Será validado que não é possível fazer register com um password em branco', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario6@novo.com',
        password: '',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email ou senha incorreto.');
  });
  it('Será validado que não é possível fazer register com um "name" menor que 12 caracteres', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario',
        email: 'usuario7@novo.com',
        password: '123456',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe(
      'O nome deve conter, no mínimo, 12 letras, sem números ou caracteres especiais',
    );
  });
  it('Será validado que não é possível fazer register com um password menor que 6 caracteres', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario8@novo.com',
        password: '12356',
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email ou senha incorreto.');
  });
  it('Será validado que não é possível fazer register com um "password" que não seja string', async () => {
    const response = await frisby
      .post(`${url}/register`, {
        name: 'Usuario novinho',
        email: 'usuario9@novo.com',
        password: 123456,
      })
      .expect('status', 401);
    const { body } = response;
    const result = JSON.parse(body);
    expect(result.message).toBe('Email ou senha incorreto.');
  });
});
