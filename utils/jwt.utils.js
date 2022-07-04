// IMPORTS des pasckages npm que l'ont va use

let jwt = require('jsonwebtoken')

// initiate variable

const JWT_SIGN_SECRET = "12345afpa6789dev"

// fonctions que l'ont va exporter 
module.exports = {
    // on cree une fonction qui va generer des token pour chaque user 
    generateTokenUser: (userData)=> {
        return jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET,
        {})
    }
}