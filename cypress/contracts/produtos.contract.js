const Joi = require ('joi')

const produtosSchema = Joi.object({
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        administrador: Joi.string(),
        _id: Joi.string()
    }),
    quantidade: Joi.number()

})

export default produtosSchema;
