# quiz-app
This project is about creating MCQ quiz with multiple options where one answer is correct.

### Process to run locally
**NodeJs**
1. Clone the repository
```
git clone git@github.com:falconforge/quiz-app.git
```
2. Change directory
```
cd quiz-app
git checkout master
```
3. Install the dependencies
```
npm i
```
4. Change the secrets in .env
5. Run project
```
npm run dev
```

**Docker**
1. Clone the repository
```
git clone git@github.com:falconforge/quiz-app.git
```
2. Change directory
```
cd quiz-app
git checkout master
```
3. Change the secrets in .env
4. Run project
```
docker-compose up --build
```


**Jest Testing:**

Note: Make sure your database is connected.

Run below command from root directory of the project
```
npm jest --runInBand
```

**Postman Collection**

Name: Quiz App.postman_collection.json

Import this collection in your Postman App and you can access all the endpoints build in this quiz app.

**Note:** Make sure one environment is created with "<i>baseUrl<i>" and "<i>token<i>" variables.

Base URl: localhost:3000

Token: Copy it from the response of Login API.


**API Documentation:**

[Postman Documentation](https://documenter.getpostman.com/view/18690981/2sAYJAdxVJ)
