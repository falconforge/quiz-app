# quiz-app
This project is about creating MCQ quiz with multiple options where one answer is correct.

### Process to run locally
**NodeJs**
1. Clone the repository
2. cd quiz-app
3. npm i
4. change the secrets in .env
5. npm run dev

**Docker**
1. Clone the repository
2. cd quiz-app
3. change the secrets in .env
4. docker-compose run --rm nodeapp npm install
5. docker-compose up --build

**Postman Collection**

Name: Quiz App.postman_collection.json
Import this collection in your Postman App and you can access all the endpoints build in this quiz app.

### Project Demo
**Host URL:** https://quiz-app-os77.onrender.com

**Endpoints**
1. /users/register
2. /users/login
3. /users/profile
4. /quiz/create-quiz
5. /quiz/get-quiz?quizId=1
6. /quiz/post-answer
7. /quiz/get-result?quizId=1