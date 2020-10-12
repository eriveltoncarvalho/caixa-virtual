import request from 'supertest';
import { isUuid } from 'uuidv4';
import app from '../app';

let _id_categoria = '';

describe('Transaction', () => {
  it('should be able to create a new category', async () => {
    const response = await request(app).post('/transactions/categories').send({
      title: 'Salary',
    });
    _id_categoria = (response.body.id);
 
    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      title: 'Salary',
    });
  });

  it('should be able to create a new transaction', async () => {
    console.log(_id_categoria)
    const response = await request(app).post('/transactions').send({
      id_categoria: _id_categoria, 
      data: "2020-10-11T20:25:34",
      title: 'Salary',
      type: 'Entrada',
      value: 1200,
    });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      id_categoria: _id_categoria, 
      data: "2020-10-11T20:25:34",
      title: 'Salary',
      type: 'Entrada',
      value: 1200,
    });
  });

  it('should be able to list the transactions', async () => {
    await request(app).post('/transactions').send({
      data: "2020-10-11T20:25:34",
      id_categoria: _id_categoria, 
      categoria: {
        "id": "96f90e33-8989-4a1a-8c5d-dffdd112cce1",
        "title": "Receitas"},
      title: 'Salary',
      type: 'Entrada',
      value: 3000  
    });

    await request(app).post('/transactions').send({
      data: "2020-10-11T20:25:34",
      id_categoria: _id_categoria,
      categoria: {
        "id": "96f90e33-8989-4a1a-8c5d-dffdd112cce1",
        "title": "Receitas"},
      title: 'Bicycle',
      type: 'Saída',
      value: 1500,
    });

    const response = await request(app).get('/transactions');

    expect(response.body.movimentacoes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          data: "2020-10-11T20:25:34",
          id_categoria: _id_categoria, 
          categoria: {
            "id": "96f90e33-8989-4a1a-8c5d-dffdd112cce1",
            "title": "Receitas"},
          title: 'Salary',
          type: 'Entrada',
          value: 3000,
        }),
        expect.objectContaining({
          id: expect.any(String),
          data: "2020-10-11T20:25:34",
          id_categoria: _id_categoria, 
          categoria: {
            "id": "96f90e33-8989-4a1a-8c5d-dffdd112cce1",
            "title": "Receitas"},
          title: 'Bicycle',
          type: 'Saída',
          value: 1500,
        }),
        expect.objectContaining({
          id: expect.any(String),
          data: "2020-10-11T20:25:34",
          id_categoria: _id_categoria, 
          categoria: {
            "id": "96f90e33-8989-4a1a-8c5d-dffdd112cce1",
            "title": "Receitas"},
          title: 'Salary',
          type: 'Entrada',
          value: 1200,
        }),
      ]),
    );

    expect(response.body.totais).toMatchObject({
      entrada: 4200,
      saida: 1500,
      saldoTotal: 2700,
    });
  });

  it('should not be able to create outcome transaction without a valid balance', async () => {
    const response = await request(app).post('/transactions').send({
      id_categoria: _id_categoria, 
      data: "2020-10-11T20:25:34",
      title: 'Bicycle',
      type: 'Saída',
      value: 3000,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });
});
