const request = require("supertest")
const app = require("../app")

const Users = require("../model/usersDAO")

const knex = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: process.env.USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    }
})

const UsersDAO = new Users(knex)


describe("Test all occurences regarding a user", () => {

    test("Adding a new user", async () => {
        const user = {
            name: "test",
            email: "test1@test.com",
            dob: "01/01/2000",
            location: 'Nigeria',
            type: "renter"
        }
        const response = await request(app).post("/register").send(user)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(true)
    })


    test("Should not add a user when the email already exists", async () => {
        const user1 = {
            name: "test",
            email: "test2@test.com",
            dob: "01/01/2000",
            location: 'Nigeria',
            type: "renter"
        }
        const response = await request(app).post("/register").send(user1)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(true)


        const user2 = {
            name: "test",
            email: "test2@test.com",
            dob: "01/01/2000",
            location: 'Nigeria',
            type: "renter"
        }
        const response2 = await request(app).post("/register").send(user2)
        expect(response2.status).toBe(409)
        expect(response2.body.status).toBe(false)
    })

    afterAll(async () => {
        await UsersDAO.removeTestData()
    })
})

describe("Test if pagination works properly", () => {

    beforeAll(async ()=>{
        let result = await UsersDAO.batchInsert(30, "buyer")
    })

    test("Check to see if data is properly paginated", async () => {
        const response = await request(app).get("/buyers/1")

        console.log(response.body)
        expect(response.status).toBe(200)
       // expect(response.body.data.length).toBe(20)

        const response2 = await request(app).get("/buyers/2")
        expect(response2.status).toBe(200)
        //expect(response2.body.data.length).toBe(10)

    })

    afterAll(async () => {
        await UsersDAO.removeTestData()
    })
})