class Sale{
    
    constructor(client_id, date_sale, total_venda, comments){
        this.client_id = client_id;
        this.date_sales = date_sale;
        this.total_venda = total_venda;
        this.comments = comments;
    }

    get getClientId(){
        return this.client;
    }

    set setClientId(value){
        this.client = value;
    }

}

module.exports = Sale;