const {Knex} = require("knex")

class Property{

    /**
     * Takes a knex object to be used to query the database and automatically
     * saves the table we're going to use in this module
     * @param {Knex} knexInstance 
     */
    constructor (knexInstance){
        this.DB = knexInstance("property")
    }


    async addProperty(name, description, for_sale, for_rent, sales_price, rent_price){
        try{
            const data = {
                name,
                description,
                for_sale: Boolean(for_sale),
                for_rent: Boolean(for_rent),
                sales_price: Number(sales_price),
                rent_price: Number(rent_price)
            }

            const result = await this.DB.insert(data)
            return result
        }catch(e){
            console.log('Error adding a property to the database')
            console.log(e)
        }
    }
}


module.exports = Property