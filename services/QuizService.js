import pool from '../database/Connector.js';

const QuizService = {
  createQuiz: async (quiz, questions, userId) => {
    const connection = await pool.getConnection();
    try {
      let response = {
        quizId: 0,
        quizname: quiz?.name,
        no_of_questions: quiz?.no_of_questions,
        questions: [],
      };
      await connection.beginTransaction();

      const [result] = await connection.query(
        `insert into quiz(name, no_of_questions, created_by) values(?,?,?)`,
        [quiz?.name, quiz?.no_of_questions, userId]
      );
      console.log('Quiz result: ', JSON.stringify(result));
      response.quizId = result?.insertId;

      questions?.forEach(async (element) => {
        let [res1] = await connection.query(
          `insert into questions(quiz_id, question, opt_1, opt_2, opt_3, opt_4, correct_ans, created_by) values (?,?,?,?,?,?,?,?)`,
          [
            result?.insertId,
            element?.question,
            element?.opt_1,
            element?.opt_2,
            element?.opt_3,
            element?.opt_4,
            element?.answer,
            userId,
          ]
        );
        console.log('Question res: ', JSON.stringify(res1));
        element.id = res1?.insertId;
        response.questions.push(element);
      });
      await connection.commit();
      return response;
    } catch (error) {
      await connection.rollback();
      throw error?.message;
    } finally {
      connection.release();
    }
  },

  getQuiz: async (id) => {
    const [result] = await pool.query(
      `SELECT 
        q.id, 
        q.name, 
        q.no_of_questions, 
        JSON_ARRAY(JSON_OBJECT(
            'question', que.question,
            'opt_1', que.opt_1,
            'opt_2', que.opt_2,
            'opt_3', que.opt_3,
            'opt_4', que.opt_4
        )) as questions 
        FROM quiz q
        left join questions que on que.quiz_id = q.id
        WHERE q.id = ?`,
      [parseInt(id)]
    );
    console.log('Result: ', JSON.stringify(result));
    return result;
  },

  postAnswer: async (body, userId) => {
    const connection = await pool.getConnection();
    try {
      let isAnswerCorrect = 0;
      let [answer] = await connection.query(
        `select * from questions where quiz_id = ? and id = ?`,
        [body?.quizId, body?.questionId]
      );
      console.log('Answer: ', JSON.stringify(answer));
      if (!answer?.length) {
        await connection.rollback();
        return {
            isAnswerCorrect,
            correct_ans: answer[0][`opt_${answer[0]?.correct_ans}`] || "",
            message: "Question not found.",
            status: 404
        }
      }

      let [postAnswer] = await connection.query(
        `insert into answers(user_id, quiz_id, question_id, answer) values(?, ?, ?, ?)`,
        [userId, body?.quizId, body?.questionId, body?.option]
      );
      console.log('Post answer: ', JSON.stringify(postAnswer));

      let updateScore;
      if (parseInt(answer[0]?.correct_ans) === parseInt(body?.option)) {
        isAnswerCorrect = 1;
        [updateScore] = await connection.query(
          `insert into results(quiz_id, user_id, score) values (?, ?, 1) on duplicate key update score = score+1`,
          [body?.quizId, userId]
        );
        console.log('Score updated: ', JSON.stringify(updateScore));
      }
      await connection.commit();

      return {
        isAnswerCorrect,
        correct_ans: answer[0][`opt_${answer[0]?.correct_ans}`],
        message: "Answer submitted sucessfully.",
        status: 201
      };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
      connection.release();
    }
  },

  getResult: async (body, userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM results WHERE user_id = ? and quiz_id = ?',
      [userId, body?.quizId]
    );
    if (rows.length === 0) throw new Error('Result not found!');
    return rows[0];
  },
};

export default QuizService;
