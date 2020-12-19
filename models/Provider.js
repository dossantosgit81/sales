class Provider {
    //Para resolver o problema do middleware e não ter que ter que criar outro arquivo apenas copiando e colando, ver se a tabela é provider
    constructor(name, cnpj, email, telephone, celphone, cep, address, number, complement, neighborhood, city, state){
        this.name = name;
        this.cnpj = cnpj;
        this.email = email;
        this.telephone = telephone;
        this.celphone = celphone;
        this.cep = cep;
        this.address = address;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
    }

    get geName(){
        return this.name;
    }

}

module.exports = Provider;