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

const signup = async (req, res) => {
    const { name, email, dob, location, type } = req.body;

    let userExists = await UsersDAO.userExists(email)

    if (userExists) {
        console.log("USER ALREADY EXISTS")
        return res.status(409).json({
            status: false,
            message: "User already exists"
        })
    }

    let result = await UsersDAO.addUser(name, email, dob, location, type)

    console.log(result)
    if (result == -1) {
        return res.status(409).json({
            status: false,
            message: "Account already exists"
        })
    }

    return res.status(200).json({
        status: true,
        message: "Account successfully created"
    })
}

const getRenters = async (req, res) => {
    let page = Number(req.params.page)

    let result = await UsersDAO.getRenters(page)

    return res.status(200).json({
        status: true,
        data: result
    })
}

const getBuyers = async (req, res) => {
    let page = Number(req.params.page)

    let result = await UsersDAO.getBuyers(page)
    console.log("******")
    console.log("Result is ", result)
    console.log("******")

    return res.status(200).json({
        status: true,
        data: result
    })
}





module.exports = {
    signup,
    getBuyers,
    getRenters
}