const Provider = require("../models/Provider");
const ServiceGeneric = require("../services/ServiceGeneric");

class ProviderController{
//If table for fornecedor sobreescreva cpf
    async create(req, res){
        const {name, cnpj, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state} = req.body;
        const obj = new Provider(name, cnpj, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state);
        const ServiceObj = await new ServiceGeneric().save(obj, "provider");

        if(ServiceObj.status){
            res.status(200).json({message: "Usuario cadastrado com sucesso"});
        }else{
            res.status(401).json({message: "Falha ao cadastrar fornecedor"});
            console.log(ServiceObj.err);
        }
    }

    async update(req, res){
        const result = await new ServiceGeneric().update(req.body, "provider", "Erro ao atualizar os dados de provider");

        if(result.status){
            res.status(200).json({message : "Usuario atualizado com sucesso"})
        }else{
            res.status(401).json(result.err);
        }
    }

    async remove(req, res){
        const id = req.params.id;

        const userDelete = await new ServiceGeneric().delete("*", {id: id}, "provider");

        if(userDelete.status){
            res.status(200).json({message: "Usuario deletado com sucesso"});
        }else if(!userDelete.status){
            res.status(401).json({message : "Usuario não encontrado"})
        }else{
            res.status(403).json({message : "Erro desconhecido"});
        }

    }

    async index(req, res){
        const SeviceObject = new ServiceGeneric();

        const users = await SeviceObject.findAll(["id", "name", "cnpj", "email", "state", "city", "address"], "provider");
        if(users.status == true){
            res.json(users);
        }else{
            console.log(users.err);
            res.status(406).json(users.err);
        }
    }

}

module.exports = new ProviderController();