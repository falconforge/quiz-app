import Joi from "joi";

const GetQuizSchema = Joi.object({
    quizId: Joi.number().required()
});

export default GetQuizSchema;