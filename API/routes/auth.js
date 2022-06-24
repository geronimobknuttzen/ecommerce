const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], (req, res) => {
    let  { email, password } = req.body
    if(email !== null && password !== null){
    let token = jwt.sign({state: 'true',password: req.body.password, email: req.body.email, username: req.body.username}, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '4h'
    });
    res.json({token: token, auth: true, password: req.body.password, email: req.body.email, username: req.body.username});
    }
});

// REGISTER ROUTE
router.post('/register', [
    check('email').isEmail().not().isEmpty().withMessage('Field can\'t be empty')
        .normalizeEmail({all_lowercase: true}),
    check('password').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('email').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    {email: value}, {username: value.split("@")[0]}
                ]
        }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Email / Username already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let email = req.body.email;
        let username = email.split("@")[0];
        let salt = bcrypt.genSaltSync(10)
        let password = bcrypt.hashSync(req.body.password, salt);
        let nombre = req.body.nombre;
        let apellido = req.body.apellido;

        /**
         * ROLE 777 = ADMIN
         * ROLE 555 = CUSTOMER
         **/
        helper.database.table('users').insert({
            username: username,
            password: password,
            email: email,
            role: 'CUSTOMER',
            apellido: apellido || null,
            nombre: nombre || null
        }).then(lastId => {
            if (lastId.insertId > 0) {
                res.status(201).json({message: 'Registro exitoso.'});
            } else {
                res.status(501).json({message: 'Fallo el registro.'});
            }
        }).catch(err => res.status(433).json({error: err}));
    }
});


module.exports = router;