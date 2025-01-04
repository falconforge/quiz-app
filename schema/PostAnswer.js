import Joi from "joi";

const PostAnswerSchema = Joi.object({
    quizId: Joi.number().required(),
    questionId: Joi.number().required(),
    option: Joi.number().required()
});

export default PostAnswerSchema;