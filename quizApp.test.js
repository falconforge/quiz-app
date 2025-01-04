import request from 'supertest';
import app from './index.js';

const BASE_URL = 'localhost:3000';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb3BhbEBnbWFpbC5jb20iLCJpYXQiOjE3MzU5NzIwNTksImV4cCI6MTczNTk3NTY1OX0.MtEvr1hyJaOJ3a5Li_dV849pC_tajZsRtJkaGeegpgI';

  let server;

beforeAll(() => {
    server = app.listen(3001, () => {
        console.log("Server is running on 3001 PORT.")
    })
});

afterAll((done) => {
    server.close(done);
})

describe('POST /quiz/create-quiz', () => {
  it('should create a quiz successfully', async () => {
    const response = await request(server)
      .post(`/quiz/create-quiz`)
      .set('Authorization', `Bearer ${token}`)
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

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Quiz created successfully');
  });
});

describe('GET /quiz/get-quiz?quizId', () => {
  it('should return the quiz details', async () => {
    const response = await request(server)
      .get(`/quiz/get-quiz?quizId=3`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.quizId).toBe(3);
  });

  it('should return 404 if the quiz is not found', async () => {
    const response = await request(server)
      .get(`/quiz/get-quiz?quizId=999`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Quiz not found');
  });
});

describe('GET /quiz/get-result', () => {
  it('should return quiz results', async () => {
    const response = await request(server)
      .get(`/quiz/get-result?quizId=3`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.quizId).toBe(3);
  });
});

describe('POST /users/login', () => {
  it('should log in the user successfully', async () => {
    const response = await request(server).post(`/users/login`).send({
      email: 'gopal@gmail.com',
      password: 'Gopal123',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(server).post(`/users/login`).send({
      email: 'gopal@gmail.com',
      password: 'WrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});

describe('POST /quiz/post-answer', () => {
  it('should post an answer successfully', async () => {
    const response = await request(server)
      .post(`/quiz/post-answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        quizId: 3,
        questionId: 1,
        option: 4,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Answer submitted successfully');
  });
});

describe('POST /users/register', () => {
  it('should register a new user successfully', async () => {
    const response = await request(server)
      .post(`${BASE_URL}/users/register`)
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Test1234',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should return 409 if user already exists', async () => {
    const response = await request(server)
      .post(`${BASE_URL}/users/register`)
      .send({
        email: 'gopal@gmail.com',
        name: 'Gopal Khichar',
        password: 'Gopal123',
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User with this email already exists');
  });
});

describe('GET /users/profile', () => {
  it('should return user profile with valid token', async () => {
    const response = await request(server)
      .get(`${BASE_URL}/users/profile`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe('gopal@gmail.com');
  });

  it('should return 401 for missing or invalid token', async () => {
    const response = await request(server).get(`${BASE_URL}/users/profile`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });
});
