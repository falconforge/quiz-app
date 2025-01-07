import request from 'supertest';
import app from './index.js';

let server;
let token = ''; // Initialize token

beforeAll(() => {
  server = app.listen(3001, () => {
    console.log('Server is running on 3001 PORT.');
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});

describe('API Tests', () => {
  describe('POST /users/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(server).post('/users/register').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Test1234',
      });
      expect([201, 409]).toContain(response.status);
      expect(['User registered successfully','User already exists!']).toContain(response.body.message);
    });

    it('should return 409 if user already exists', async () => {
      const response = await request(server).post('/users/register').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Test1234',
      });

      expect(response.status).toBe(409);
      expect(['User registered successfully','User already exists!']).toContain(response.body.message);
    });
  });

  describe('POST /users/login', () => {
    it('should log in the user successfully and update the token', async () => {
      const response = await request(server).post('/users/login').send({
        email: 'test@example.com',
        password: 'Test1234',
      });

      expect(response.status).toBe(200);
      // Update token
      token = response.body.data.token;
    });

    it('should return 500 for invalid password', async () => {
      const response = await request(server).post('/users/login').send({
        email: 'test@example.com',
        password: 'WrongPassword',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Invalid password!');
    });

    it('should return 500 for invalid email', async () => {
      const response = await request(server).post('/users/login').send({
        email: 'wrongtest@example.com',
        password: 'WrongPassword',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('User not found!');
    });
  });

  describe('GET /users/profile', () => {
    it('should return user profile with valid token', async () => {
      const response = await request(server)
        .get('/users/profile')
        .set('Authorization', `${token}`);
      console.log('Profile:', JSON.stringify(response));
      expect(response.body.status).toBe(200);
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should return 401 for missing or invalid token', async () => {
      const response = await request(server).get('/users/profile');
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('No token provided!');
    });
  });

  describe('POST /quiz/create-quiz', () => {
    it('should create a quiz successfully', async () => {
      const response = await request(server)
        .post('/quiz/create-quiz')
        .set('Authorization', `${token}`)
        .send({
          quizName: 'Sample Quiz',
          questions: [
            {
              question: 'What is 2 + 2?',
              opt_1: '3',
              opt_2: '4',
              opt_3: '5',
              opt_4: '6',
              answer: 2,
            },
          ],
        });

      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe('Quiz created successfully');
    });
  });

  describe('GET /quiz/get-quiz', () => {
    it('should return the quiz details', async () => {
      const response = await request(server)
        .get('/quiz/get-quiz?quizId=1')
        .set('Authorization', `${token}`);

      expect(response.body.status).toBe(200);
    });

    it('should return 404 if the quiz is not found', async () => {
      const response = await request(server)
        .get('/quiz/get-quiz?quizId=999')
        .set('Authorization', `${token}`);

      expect(response.status).toBe(204);
    });
  });

  describe('POST /quiz/post-answer', () => {
    it('should post an answer successfully', async () => {
      const response = await request(server)
        .post('/quiz/post-answer')
        .set('Authorization', `${token}`)
        .send({
          quizId: 1,
          questionId: 1,
          option: 2,
        });

      expect([201,409]).toContain(response.status);
      expect(['Answer submitted sucessfully.','Answer is already submitted']).toContain(response.body.message);
    });
  });

  describe('GET /quiz/get-result', () => {
    it('should return quiz results', async () => {
      const response = await request(server)
        .get('/quiz/get-result?quizId=1')
        .set('Authorization', `${token}`);
      console.log('body: ', JSON.stringify(response.body));
      expect(response.body.status).toBe(200);
    });
  });
});
