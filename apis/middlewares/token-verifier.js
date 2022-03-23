const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    let bearerToken = req.headers.authorization
    if (bearerToken == undefined) {
        res.status(200).send({ message: "Unauthorised Request!" })
    } else {
        try {
            let token = bearerToken.split(" ")[1]
            jwt.verify(token, process.env.SECRET_KEY)
            next()
        } catch {
            next(new Error("Session expired!"))
        }
    }
}

module.exports = verifyToken
