require ('babel-register')
const express = require('express')
const app = express()
var cors = require('cors') // gère les problèmes liés au CORS (Cross Origin Resource Sharing)
var bodyParser = require('body-parser')  // aide à récupérer les informations des demandes POST, le body

// Middlewares :
app.use(cors())
app.use(bodyParser.json());

/*
// Routes :
app.get('/membres', (req, res) => {
    // res.send('Page Membres')
    res.json("Ceci est mon texte")
}) */

app.listen(8080, () => {
        console.log('Started on port 8080.')
    })


const mysql = require('mysql')
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
/*
// Requête à la bdd :
connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        // Route membres :
        app.get('/membres', (req, res) => {
            res.json(result)
        })    
    }
}) */


// Configuration de la route où notre application peut adresser des demandes post :
app.post('/login', (req, res) => {
    // console.log(req.body);
    const email = req.body[0];
    const password = req.body[1];
    
    connection.query("SELECT * FROM user WHERE email='" + email + "' AND password='" + password + "'", (err, rows, fields) => {
        if (err) throw err;
        res.json(rows[0]);
    })       
});




/*
// Configuration de la route où notre application peut adresser des demandes post :
app.post('/login', (req, res) => {
    // console.log(req.body);
    const email = req.body[0];
    const password = req.body[1];
    
    // Requête à la bdd :
    connection.query("SELECT * FROM user WHERE email='" + email + "' AND password='" + password + "'", (err, result) => {
        if (err) {
            console.log(err.message);
            // console.log("NOT OK"); 
        } else {    
            console.log(result);
            if (result = null){
                // res.json({"success": false});
                console.log("NOT OK");
            } else {
                // res.json({"success": true});
                console.log("OK");
            }
        }  
    })
});
*/
