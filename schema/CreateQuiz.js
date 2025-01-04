import Joi from "joi";

const CreateQuizSchema = Joi.object({
    quizName: Joi.string().required(),
    questions: Joi.array().items(
        Joi.object({
            question: Joi.string().required(),
            opt_1: Joi.string().required(),
            opt_2: Joi.string().required(),
            opt_3: Joi.string().required(),
            opt_4: Joi.string().required(),
            answer: Joi.number().required()
        })
    ).min(1).max(100)
});

export default CreateQuizSchema;