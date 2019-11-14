require ('babel-register')
const express = require('express')
const app = express()
var cors = require('cors') // gère les problèmes liés au CORS (Cross Origin Resource Sharing)
var bodyParser = require('body-parser')  // aide à récupérer les informations des demandes POST, le body
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const router = express.Router();


// Middlewares :
app.use(cors())
app.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
/*
// Fonctions :
const findUserByEmail = (email, cb) => {
    return connection.query(`SELECT * FROM user WHERE email = ?`,[email], (err, row) => {
            cb(err, row[0])
            console.log(row[0]); // Users renvoyés par la bdd, [] si pas trouvé.
    });
}
 */
// Routes :
router.post('/login', (req, res) => {
    // console.log(req.body[0]);
    const email = req.body[0];
    
    connection.query("SELECT * FROM user WHERE email='" + email + "'", (err, rows) => {
        // console.log(rows);
        if (err) {
            res.status(500).send("Server error!");
            console.log(1);
        } else if (rows.length <1) {
            res.status(404).send("User n\'existe pas!");
            // res.json("User n\'existe pas!");
        } else {
            res.status(200).send(rows[0]);
        }
    })       
});

router.get('/', (req, res) => {
        // res.send('Page d\'accueil')
        res.json("Voici le serveur d'authentification  des utilisateurs de l'application Syvios.")
    })

// BDD :
// Initialisation de la connexion :
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'testProduits',
    user: 'root',
    password: ''
});
// Contrôle de la connexion :
connection.connect((err) => {
        if (err) {
                console.log("Erreur de connexion à la base de données.");
                console.log(err);
        } else {
                console.log("La base de données est connectée.");
        }
})

// Port :
app.use(router);
const  port  =  process.env.PORT  ||  8080;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
});

/*
app.listen(8080, () => {
        console.log('Ce serveur se lance sur le port 8080.')
    })
*/