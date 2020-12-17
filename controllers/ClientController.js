const Client = require("../models/Client");
const ServiceGeneric = require("../services/ServiceGeneric");

class ClientController{

    async create(req, res){
        
        const {name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state} = req.body;

        try{     
            await new ServiceGeneric().save(new Client(name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state), "client");
            res.status(200).json({message : "Usuario cadastrado com sucesso!!!"});
        }catch(err){
            res.status(406).json({message : "Erro de validação"});
            console.log(err);
        }

    }

    async update(req, res){

        try{
            const result = await new ServiceGeneric().update(req.body, "client", "Erro ao atualizar os dados");
            if(result != undefined){
                if(result.status){
                    res.json({message: "Tudo OK!"})
                }else{
                    res.status(406).json(result.err);
                }
            }else{
                res.status(406).json({message: "Ocorreu um erro no servidor!"});
            }
        }catch(err){
            console.log(err);
        }

    }

    async index(req, res){
        const SeviceObject = new ServiceGeneric();

        const users = await SeviceObject.findAll(["id", "name", "cpf", "rg", "email", "state", "city", "address"], "client");
        if(users.status == true){
            res.json(users);
        }else{
            console.log(users.err);
            res.status(406).json(users.err);
        }
    }

    async remove(req, res){
        const id = req.params.id;

        const userDelete = await new ServiceGeneric().delete("*", {id : id}, "client");

        if(userDelete.status){
            res.status(200).json({message: "Usuario deletado com sucesso"});
        }else if(!userDelete.status){
            res.status(406).json({message: "Usuario não encontrado"});
        }else{
            res.status(403).json({message: "Error desconhecido"})
        }

    }

}

module.exports = new ClientController();