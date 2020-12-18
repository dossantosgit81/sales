const Employee = require("../models/Employee");
const ServiceGeneric = require("../services/ServiceGeneric");
const Bcrypt = require("bcrypt");

class EmployeeController{

    async new(req, res){

        const {name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state, office, access_level, password} = req.body;
        const hash = await Bcrypt.hash(password, 10);

        try{
            const EmployeeObject = new Employee(name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state, office, access_level, hash); 
            const ServiceObject =  new ServiceGeneric();
            ServiceObject.save(EmployeeObject, "employee")
            res.status(200).json({message: "Usuario cadastrado com sucesso!!!"});
        }catch(err){
            res.status(406).json({message: "Erro no cadastro!!!"});
        }
        
    }

     async update(req, res){
        //Passa um objeto descontruido dos dados que vc quer que seja atualizado, no caso não podemos atualizar a senha como atualizamos o email
        const {id, name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state, office, access_level} = req.body;
        const objectUpdate = {id, name, rg, cpf, email, telephone,
             celphone, cep, address, number, 
            complement, neighborhood, city, state, office, access_level};
       
        try{

            const result = await new ServiceGeneric().update(objectUpdate, "employee", "Erro ao atualizar!");
            if(result.status){
                res.status(200).json({message: "Usuario atualizado com sucesso"});
            }else{
                res.status(406).json({message: result.err});
            }

        }catch(err){
            res.status(406).json({message : "Erro na atualização"});
            console.log("Errorrr"+ err);

        }

     }

    async remove(req, res){
        const id = req.params.id;

        const userDelete = await new ServiceGeneric().delete("*", {id: id}, "employee");

        if(userDelete.status){
            res.status(200).json({message: "Usuario deletado com sucesso"});

        }else if(!userDelete.status){
            res.status(406).json({message: "Usuario não encontrado"});

        }else{
            res.status(403).json({message: "Error desconhecido"});
        
        }
    }

    async readAll(req, res){
        const users = await new ServiceGeneric().findAll(["id", "name", "cpf", "rg", "email", "state", "city", "address", "office", "access_level"], "employee");

        if(users.status){
            res.json(users).status(200);
        }else{
            res.json({message: "Erro interno no servidor"});
            console.log(" Error, trate" + users.err);
        }

    }

}

module.exports = new EmployeeController();