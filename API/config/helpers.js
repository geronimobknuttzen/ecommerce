const Mysqli = require('mysqli');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let conn = new Mysqli( {
    // host:'45.132.157.103',
    // port:3306,
    // user:'u295231004_atweb',
    // passwd:'HbR@%^9@7X?H',
    // db:'u295231004_atweb'
    host:'localhost',
    port:3306,
    user:'root',
    passwd:'',
    db:'atweb'
});


let db = conn.emit(false,'');

const secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";

module.exports = {
    database: db,
    secret: secret,
    validJWTNeeded: (req, res, next) => {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    req.jwt = jwt.verify(authorization[1], secret);
                    return next();
                }
            } catch (err) {
                return res.status(403).send("Authentication faileds");
            }
        } else {
            return res.status(401).send("No authorization header found.");
        }
    },    
    hasAuthFields: (req, res, next) => {
        let errors = [];

        if (req.body) {
            if (!req.body.email) {
                errors.push('Missing email field');
            }
            if (!req.body.password) {
                errors.push('Missing password field');
            }

            if (errors.length) {
                return res.status(400).send({errors: errors.join(',')});
            } else {
                return next();
            }
        } else {
            return res.status(400).send({errors: 'Missing email and password fields'});
        }
    },
    isPasswordAndUserMatch: async (req, res, next) => {
        const myPlaintextPassword = req.body.password;
        const myEmail = req.body.email;          
        const user = await db.table('users')
            .filter({$or:[{ email : myEmail }]})
            .get();
        if (user) {
            const match = bcrypt.compareSync(myPlaintextPassword, user.password);
            console.log(match);
            if(match){

            console.log('User correct');
                return next();
            }
        } else {
            console.log('User incorrect');
            res.status(401).send("Username or password incorrect");
        }
    }
};