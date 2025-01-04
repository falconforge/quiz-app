import Joi from "joi";

const GetResultSchema = Joi.object({
    quizId: Joi.number().required()
});

export default GetResultSchema;