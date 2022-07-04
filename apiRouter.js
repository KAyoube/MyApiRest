// IMPORTS des pasckages npm que l'ont va use

let express= require('express')

// Imports via dossiers

let usersCtrl = require('./routes/usersCtrl')

// router
exports.router = (() => {
    let apiRouter = express.Router();

    // Users route
    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)

    return apiRouter;
})();