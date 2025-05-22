const request = require('supertest');
const app = require('../backend/app.cjs'); // path to your Express app

jest.mock('../backend/connection.cjs', () => {
  const mongoose = require('mongoose');
  const mockData = [
    { _id: '1', nome: 'Test Player', nickname: 'TP', ra: '123', area: 'IT', cargo: 'Dev' },
  ];
  const Player = {
    find: jest.fn().mockResolvedValue(mockData),
    findOne: jest.fn().mockImplementation(({ ra }) =>
      Promise.resolve(mockData.find(player => player.ra === ra))
    ),
  };
  return { Player };
});

describe('GET /players', () => {
  it('should return list of players', async () => {
    const response = await request(app).get('/players');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('nome', 'Test Player');
  });
});

describe('GET /player?ra=123', () => {
  it('should return a single player if exists', async () => {
    const response = await request(app).get('/player?ra=123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ra', '123');
  });

  it('should return 401 if player does not exist', async () => {
    const response = await request(app).get('/player?ra=000');
    expect(response.statusCode).toBe(401);
  });
});
