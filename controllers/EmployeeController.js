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
        try{

            const result = await new ServiceGeneric().update(req.body, "employee", "Erro ao atualizar!");
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

    // async delete(req, res){

    // }

    // async read(req, res){

    // }

}

module.exports = new EmployeeController();