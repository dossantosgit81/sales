const Client = require("./Client");

class Employee extends Client{

     constructor(name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state, office, access_level, password){

        super(name, rg, cpf, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state);
        
        this.office = office;

        this.access_level = access_level;

        this.password = password;

    }


}

module.exports = Employee;