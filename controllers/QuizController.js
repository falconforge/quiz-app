import QuizService from '../services/QuizService.js';
import RequestHandler from '../utils/RequestHandler.js';
import CreateQuizSchema from '../schema/CreateQuiz.js';
import GetQuizSchema from '../schema/GetQuiz.js';
import PostAnswerSchema from '../schema/PostAnswer.js';
import GetResultSchema from '../schema/GetResult.js';

const QuizController = {
  createQuiz: async (req, res) => {
    try {
      console.log('Body:', JSON.stringify(req.body));
      let validator = CreateQuizSchema.validate(req?.body);
      if (validator?.error) {
        return RequestHandler.response(
          res,
          400,
          'Bad request',
          validator?.error
        );
      }
      let mainQuiz = {
        name: req?.body?.quizName,
        no_of_questions: req?.body?.questions?.length,
      };
      console.log('Main quiz:', JSON.stringify(mainQuiz));
      let questions = req?.body?.questions;
      const quiz = await QuizService.createQuiz(
        mainQuiz,
        questions,
        req?.user?.id
      );

      return RequestHandler.response(
        res,
        201,
        'Quiz created successfully',
        quiz
      );
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },

  getQuiz: async (req, res) => {
    try {
      let body = req?.query;
      let validator = GetQuizSchema.validate(body);
      if (validator?.error) {
        return RequestHandler.response(
          res,
          400,
          'Bad request',
          validator?.error
        );
      }
      console.log('Body: ', JSON.stringify(body));
      const quiz = await QuizService.getQuiz(body?.quizId);
      if (quiz?.length) {
        return RequestHandler.response(
          res,
          200,
          'Quiz fetched successfully',
          quiz[0]
        );
      }
      return RequestHandler.response(res, 204, 'Quiz not available', {});
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },

  postAnswer: async (req, res) => {
    try {
      let body = req?.body;
      let validator = PostAnswerSchema.validate(body);
      if (validator?.error) {
        return RequestHandler.response(
          res,
          400,
          'Bad request',
          validator?.error
        );
      }
      console.log('Body: ', JSON.stringify(body));
      let question = await QuizService.postAnswer(body, req?.user?.id);
      console.log("Question: ", JSON.stringify(question))
      return RequestHandler.response(
        res,
        question?.status,
        question?.message,
        question
      );
    } catch (error) {
      console.log('Error: ', JSON.stringify(error));

      if (error?.code === "ER_DUP_ENTRY") {
        return RequestHandler.response(
            res,
            409,
            "Answer is already submitted",
            {}
        )
      }
      return RequestHandler.response(res, 500, error);
    }
  },

  getResult: async (req, res) => {
    try {
        let body = req?.query;
        let validator = GetResultSchema.validate();
        if(validator?.error){
            return RequestHandler.response(
                res,
                400,
                'Bad request',
                validator?.error
            );
        }
        const result = await QuizService.getResult(body,req.user.id);
        return RequestHandler.response(
            res,
            200,
            'Result fetched successfully',
            result
        );
    } catch (error) {
      return RequestHandler.response(res, 500, error.message);
    }
  },
};

export default QuizController;
