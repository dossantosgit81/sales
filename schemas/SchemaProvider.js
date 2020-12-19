const Yup = require("yup");

const SchemaProvider = Yup.object().shape({
    name:  Yup.string().required("Nome requerido"),
    email: Yup.string().email("Email invalido").required("Email requerido"),
    cnpj: Yup.string().length(14, "CNPJ tem que conter 14 caracteres").required("CNPJ requerido"),
    celphone: Yup.number().required("Telefone celular requerido").positive("Digite números postivos por favor").integer("Só aceitamos números inteiros") 
});

module.exports = SchemaProvider;