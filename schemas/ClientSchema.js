const Yup = require("yup");

const ClienteSchema = Yup.object().shape({
    name:  Yup.string().required("Nome requerido"),
    email: Yup.string().email("Email invalido").required("Email requerido"),
    cpf: Yup.string().length(14, "CPF tem conter no minimo 14 caracteres").required("CPF requerido"),
    rg: Yup.string().length(10, "RG tem que conter no minimo 14 caracteres").required("RG requerido"),
    celphone: Yup.number().required("Telefone celular requerido").positive("Digite números postivos por favor").integer("Só aceitamos números inteiros") 
});

module.exports = ClienteSchema;