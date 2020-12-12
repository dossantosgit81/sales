const Client = require("../models/Client");
const ServiceGeneric = require("../services/ServiceGeneric");

class ClientController{

    async create(req, res){
        
        const {name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state} = req.body;

        try{     
            await new ServiceGeneric().save(new Client(name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state), "client");
            res.status(200);
            res.send("Usuario cadastrado com sucesso!!!");
        }catch(err){
            res.status(406);
            res.send("Erro de validação");
            console.log(err);
        }

    }


}

module.exports = new ClientController();