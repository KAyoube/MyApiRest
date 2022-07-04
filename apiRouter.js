// IMPORTS des pasckages npm que l'ont va use

let express= require('express')

// Imports des packages via dossiers

let usersCtrl = require('./routes/usersCtrl')

// router
exports.router = (() => {
    let apiRouter = express.Router();

    // Users route
    apiRouter.route('/users/register/').post(usersCtrl.register)
    apiRouter.route('/users/login/').post(usersCtrl.login)
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfil)
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile)

    return apiRouter;
})();