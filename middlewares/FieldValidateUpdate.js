const ServiceGeneric = require("../services/ServiceGeneric");
const Schema = require("../schemas/Schema");

module.exports = async function(req, res, next){
    const {rg, cpf, email, celphone} = req.body;
    const tableDB = req.url.split("/")[1];
    
    const ServiceObject = new ServiceGeneric();
    
    const findByEmail = await ServiceObject.findByGeneric("*", {email: email}, tableDB);
    const findByCpf = await ServiceObject.findByGeneric("*", {cpf: cpf}, tableDB);
    const findByRg = await ServiceObject.findByGeneric("*", {rg: rg}, tableDB);
    const findByCelphone = await ServiceObject.findByGeneric("*", {celphone: celphone}, tableDB);

    if(findByEmail.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse email"});
        return;

    }else if(findByCpf.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse CPF"});
        return;  
    }else if(findByRg.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse RG"});
        return;

    }else if(findByCelphone.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse número de telefone"});
        return;

    }else{
        try{
            await Schema.validate(req.body);
                next();
         }catch(err){      
             err.errors.forEach(erro => {
                res.status(406).json({erro});
            }); 
         }
    }


}
  

