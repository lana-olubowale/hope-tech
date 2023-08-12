const { Knex } = require("knex")

/**
 * @typedef {import('knex')} Knex
 */
class Users {
    /**
     * Takes a knex object to be used to query the database
     * @param {Knex} knexInstance 
     */
    constructor(knexInstance) {
        /**
         * @type {Knex}
         */
        this.DB = knexInstance("users")
    }

    /**
     * Adds an item to the database
     * @param {string} name 
     * @param {string} email
     * @param {Date} dob 
     * @param {Number} location 
     * @param {string} type 
     */
    async addUser(name, email, dob, location, type) {
        try {
            const data = {
                name,
                email,
                dob: new Date(dob),
                location,
                type
            }
            const result = await this.DB.insert(data)
            return result;
        } catch (e) {
            console.log("Error inserting item into the database ")
            console.log(e)
            return -1
        }

    }

    /**
     * Checks if a user is in the database
     * @param {string} user_email 
     * @returns a booolean that tells if the user is in the database
     */
    async userExists(user_email) {

        try {
            const result = await this.DB.where("email", user_email)
            console.log("CHECKING IF ", user_email, " and result is: ", result)
            console.log(result.length)
            console.log("###")
            return result.length != 0
        } catch (e) {
            console.log("Error trying to find if a user exists")
            console.log(e)
        }
    }

    /**
     * Retrieves at most 20 renters from the database depending on the page number
     * @param {Number} page_number 
     * @returns an array of renters
     */
    async getRenters(page_number) {
        try {
            const skip_count = (page_number - 1) * 20
            const result = await this.DB.where("type", "renter").offset(skip_count).limit(20)
            return result;
        } catch (e) {
            console.log("Error trying to retrieve renters")
            console.log(e)
        }

    }

    /**
     * Retrieves at most 20 buyers from the database depending on the page number
     * @param {Number} page_number 
     * @returns an array of buyers
     */
    async getBuyers(page_number) {
        try {
            const skip_count = (page_number - 1) * 20
            const result = await this.DB.where("type", "buyer").offset(skip_count).limit(20)
            return result;
        } catch (e) {
            console.log("Error trying to get buyers")
            console.log(e)
        }

    }

    async removeTestData() {
        try {
            const result = await this.DB.where("name", "test").del()
            return result
        } catch (e) {
            console.log("Error deleting test data")
            console.log(e)
        }
    }

    async batchInsert(num, type) {
        for (var i = 0; i < num; i++) {
            const val = {
                name: "test",
                email: `testt@test${i}.com`,
                dob: new Date(),
                location: "Nigeria",
                type
            }

            const res = await this.DB.insert(val)
        }
    }
}

module.exports = Users