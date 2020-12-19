const ServiceGeneric = require("../services/ServiceGeneric");
const Schema = require("../schemas/Schema");
const SchemaProvider = require("../schemas/SchemaProvider");

module.exports = async function(req, res, next){
    let {rg, cpf} = "";
    let cnpj = "";

    const tableDB = req.url.split("/")[1];

    const ServiceObject = new ServiceGeneric();
    
    const email = req.body.email;
    const findByEmail = await ServiceObject.findByGeneric("*", {email: email}, tableDB);

    const celphone = req.body.celphone;
    const findByCelphone = await ServiceObject.findByGeneric("*", {celphone: celphone}, tableDB);

    let findByIdentity = {};
    let findByRg = {};

    if(tableDB === "client" || tableDB === "employee"){
        rg = req.body.rg;
        cpf = req.body.cpf;

        findByIdentity = await ServiceObject.findByGeneric("*", {cpf: cpf}, tableDB);
        findByRg = await ServiceObject.findByGeneric("*", {rg: rg}, tableDB);
    } else

    if(tableDB === "provider"){
        cnpj = req.body.cnpj;
        findByIdentity = await ServiceObject.findByGeneric("*", {cnpj: cnpj}, tableDB);
    }

    if(findByEmail.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse email"});
        return;      
    }else if(findByIdentity.status && tableDB === "client" || tableDB ==="employee" && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse CPF"});
        return;   
    }else if(findByIdentity.status && tableDB === "provider" && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse CNPJ"});
        return;   
    }
    else if(findByRg.status && tableDB === "client" || tableDB ==="employee" && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse RG"});
        return;   
    }else if(findByCelphone.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse número de telefone"});
        return;
    }else{
        try{
            if(tableDB === "client" || tableDB === "employee"){
                await Schema.validate(req.body);
                next();
            }else{
                await SchemaProvider.validate(req.body);
                next();
            }
         }catch(err){
             res.status(400);
             
             err.errors.forEach(erro => {
                 res.send(erro);
            }); 
         } 
    }


}
  

