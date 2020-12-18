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

    if(findByEmail.status == 
        false && findByCpf.status == false && findByRg.status == false && findByCelphone.status == false){       
            try{
                await Schema.validate(req.body);
                     next();
             }catch(err){
                 res.status(400);
                 
                 err.errors.forEach(erro => {
                     res.send(erro);
                }); 
             }
    }

    if(findByEmail.status){
        res.status(422).json({error: "Já existe um usuario com esse email"});
        return;      
    }else if(findByCpf.status){
        res.status(422).json({error: "Já existe um usuario com esse CPF"});
        return;   
    }else if(findByRg.status){
        res.status(422).json({error: "Já existe um usuario com esse RG"});
        return;   
    }else if(findByCelphone.status){
        res.status(422).json({error: "Já existe um usuario com esse número de telefone"});
        return;
    }

}
  

