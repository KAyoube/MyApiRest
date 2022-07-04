// IMPORTS des pasckages npm que l'ont va use

let bcrypt = require("bcrypt");

// IMPORTS des pasckages que l'ont va use via dossier

let models = require("../models");
let jwtUtils = require('../utils/jwt.utils');

// Routes

module.exports = {

  // on cree une FONCTION REGISTER
  register: (request, response) => {

    // recuperer les parametre du user
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let email = request.body.email;
    let password = request.body.password

    // verification des champs si vide on renvoie une erreur
    if (nom == null || prenom == null || password == null || email == null) {
      return response
        .status(400)
        .json({ error: "An error occurred,champs vide" });
    }

    // tcheck(email) si le user n'exite pas dans notre BDD
    models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    })

    .then((userFound) => {

        // si le new user nexiste pas dans la BDD
      if (!userFound) {

        // on hache le password pour secure la connexion
        bcrypt.hash(password, 5, (err, bcryptedPassword) => {

         // on implémente un user avec les infos suivantes role=0 (en dur) car tout newuser !=admin
          let newUser = models.User.create({
            nom: nom,
            prenom: prenom,
            email: email,
            password: bcryptedPassword,
            role:0

          }) // on renvoi un success avec un objet de ses infos
            .then((newUser) => {
              return response.status(201).json({ 
                'success': "User successfully created",
                'userId':newUser.id,
                'user_lastname':newUser.nom,
                'user_name':newUser.prenom,
                'password':bcryptedPassword,
                'email':newUser.email

             });
            })
            .catch((err) => {
              return response.status(400).json({ 'error': "An error occurred" });
            });
        });

        //Si le user existe deja dans notre BDD alors on renvoi une erreur
      } else {
        return response.status(409).json({ 'error': "An error occured (user exist)" });
      }
    });

  },// REGISTER OK.

  // on cree une FONCTION LOGIN
  login: (request, response) => {

    // recuperer les info login du user
    let email = request.body.email;
    let password = request.body.password;

    // tcheck si les champs sont vide

    if (email == null || password == null) {
      return response.status(400).json({ error: "AN error occurred champs vide" });
    }

    // tcheck si le mail user login = mail user register 

    models.User.findOne({
      where: { email: email }
    })
    .then((userFound) => {

        // si email login = email register
        if(userFound){

            // on compare le mot de passe haché precedemment avec celui rentré
            bcrypt.compare(password,userFound.password,(errBcrypt,resBcrypt) => {

             // si password identique on renvoi un objet avec info user existant
                if(resBcrypt){
                    return response.status(200).json({
                        'userId':userFound.id,
                        'user_lastname':userFound.nom,
                        'user_name':userFound.prenom,
                        'TOKEN': jwtUtils.generateTokenUser(userFound)
                    })
                 
                  // si password login != password register(haché)   
                } else {
                    return response.status(403).json({'error':'Mauvais password'})
                }
            }
            )
         // si email login != email register    
        } else{
                return response.status(400).json({'error':'An error occurred user not in DB'})
        }
    })
    .catch((err) => {
        
        return response.status(400).json({'error':'An error occurred user not found'})
    })
    
  },// LOGIN OK.

  // on cree une FONCTION UPDATE PROFIL
  updateProfil: () => {
    // on recupere les infos users qui peuvent etre modifié
    let nom = request.body.nom;
    let prenom = request.body.prenom;
    let email = request.body.email;

    // tcheck si les

    
  },//-------------

  // on cree une FONCTION DELETE PROFIL
};
