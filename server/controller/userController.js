const mysql = require('mysql');
const routes = require('../routes/user');

exports.Acceuil=('/',(req,res) =>{
    res.render('Acceuil');
});

exports.EspaceA=('/EspaceA',(req,res) =>{
    res.render('EspaceA');
});

exports.login=('/login',(req,res) =>{
    res.render('login');
});

exports.RegisterETD=('/RegisterETD',(req,res) =>{
    res.render('RegisterETD');
});

exports.RegisterENS=('/RegisterENS',(req,res) =>{
    res.render('RegisterENS');
});

exports.EspaceEtd=('/EspaceEtd',(req,res) =>{
    res.render('EspaceEtd');
});

exports.EspaceEns=('/EspaceEns',(req,res) =>{
    res.render('EspaceEns');
});


exports.depart=('/depart',(req,res) =>{
    res.render('depart');
});


exports.aboutus=('/aboutus',(req,res) =>{
    res.render('aboutus');
});

exports.StudentList=('/StudentList',(req,res) =>{
    res.render('StudentList');
});

exports.TeacherList=('/TeacherList',(req,res) =>{
    res.render('TeacherList');
});


exports.MatieresList=('/MatieresList',(req,res) =>{
    res.render('MatieresList');
});

exports.NewEmplois=('/NewEmplois',(req,res) =>{
    res.render('NewEmplois');
});


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "g_emplois"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Data base connected , id : " + connection.threadId);
    }
});


exports.loginP = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Connexion reçue, id : " + connection.threadId);
        }

        const cin = req.body.cin;
        const password = req.body.password;
        if (cin == "09725660" && password == "123") {
           res.render('EspaceA');
        }else{
        // Vérifier d'abord dans le tableau etudiant
        connection.query('SELECT * FROM etudiant WHERE cin = ? AND password = ?', [cin, password], (err, resultEtd) => {
            if (err) {
                console.log("Erreur lors de la requête étudiant", err);
                connection.release();
                return;
            }

            if (resultEtd.length > 0) {
                // Si l'étudiant est trouvé, rediriger vers l'espace étudiant
                res.render('EspaceEtd');
                connection.release();
            } else {
                // Si non trouvé, vérifier dans le tableau enseignant
                connection.query('SELECT * FROM ensignant WHERE cin = ? AND password = ?', [cin, password], (err, resultEns) => {
                    if (err) {
                        console.log("Erreur lors de la requête enseignant", err);
                        connection.release();
                        return;
                    }

                    if (resultEns.length > 0) {
                        // Si l'enseignant est trouvé, rediriger vers l'espace enseignant
                        res.render('EspaceEns');
                    } else {
                        // Si aucun résultat trouvé, afficher un message d'erreur
                        res.render('login', { erreur: 'Connexion échouée. Vérifiez vos informations et réessayez.' });
                    }

                    connection.release();
                });
            }
        });
    }
    });
};



/// Etudiants
exports.StudentList = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
        } else {
            console.log("connextion recu , id : " + connection.threadId);
        }
        connection.query('SELECT * FROM etudiant', (err, R) => {
            connection.release();
            if (!err) {
                res.render('StudentList', { R });
            } else {
                console.log("Erreur", err);
            }
            console.log("en utilise tableaux : \n", R);
        });
    });
}


exports.searchStd = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur de connexion à la base de données");
            return;
        } else {
            console.log("Connexion réussie, ID de la connexion : " + connection.threadId);
        }

        let searchEtd = req.body.searchEtd; // Utilisez `searchEtd` ici
        connection.query(
            'SELECT * FROM etudiant WHERE cin LIKE ?',
            ['%' + searchEtd + '%', '%' + searchEtd + '%'],
            (err, R) => {
                connection.release();
                if (err) {
                    console.log("Erreur lors de la recherche :", err);
                    res.status(500).send("Erreur lors de la recherche");
                    return;
                }
                console.log("Résultats trouvés : \n", R);
                res.render('StudentList', { R }); // Passez le résultat sous le nom de "Resultat"
            }
        );
    });
};




///Teacher


exports.TeacherList = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
        } else {
            console.log("connextion recu , id : " + connection.threadId);
        }
        connection.query('SELECT * FROM ensignant', (err, RT) => {
            connection.release();
            if (!err) {
                res.render('TeacherList', { RT });
            } else {
                console.log("Erreur", err);
            }
            console.log("en utilise tableaux : \n", RT);
        });
    });
}


exports.searchTeach = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur de connexion à la base de données");
            return;
        } else {
            console.log("Connexion réussie, ID de la connexion : " + connection.threadId);
        }

        let searchStd = req.body.searchStd; // Utilisez `searchEtd` ici
        connection.query(
            'SELECT * FROM ensignant WHERE cin LIKE ?',
            ['%' + searchStd + '%', '%' + searchStd + '%'],
            (err, RT) => {
                connection.release();
                if (err) {
                    console.log("Erreur lors de la recherche :", err);
                    res.status(500).send("Erreur lors de la recherche");
                    return;
                }
                console.log("Résultats trouvés : \n", RT);
                res.render('TeacherList', { RT }); // Passez le résultat sous le nom de "Resultat"
            }
        );
    });
};



//Matieres 

exports.MatieresList = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
        } else {
            console.log("connextion recu , id : " + connection.threadId);
        }
        connection.query('SELECT * FROM matiere', (err, RM) => {
            connection.release();
            if (!err) {
                res.render('MatieresList', { RM });
            } else {
                console.log("Erreur", err);
            }
            console.log("en utilise tableaux : \n", RM);
        });
    });
}


exports.searchMat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur de connexion à la base de données");
            return;
        } else {
            console.log("Connexion réussie, ID de la connexion : " + connection.threadId);
        }

        let searchMat = req.body.searchMat; // Utilisez `searchEtd` ici
        connection.query(
            'SELECT * FROM matiere WHERE specialite LIKE ?',
            ['%' + searchMat + '%', '%' + searchMat + '%'],
            (err, RM) => {
                connection.release();
                if (err) {
                    console.log("Erreur lors de la recherche :", err);
                    res.status(500).send("Erreur lors de la recherche");
                    return;
                }
                console.log("Résultats trouvés : \n", RM);
                res.render('MatieresList', { RM }); // Passez le résultat sous le nom de "Resultat"
            }
        );
    });
};



// exports.emplois = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log("Connexion réussie, ID de la connexion : " + connection.threadId);
//         }
//         connection.query('SELECT * FROM emplois', (err, RE) => {
//             connection.release();
//             if (!err) {
//                 // Passer les départements récupérés à la vue Handlebars
//                 res.render('EspaceA', { RE });
//             } else {
//                 console.log("Erreur", err);
//             }
//             console.log("Résultats des départements : \n", RE);
//         });
//     });
// }

// exports.getClassesByDepartement = (req, res) => {

//     if (err) {
//         console.error(err);
//         res.status(500).send("Erreur de connexion à la base de données");
//         return;
//     } else {
//         console.log("Connexion réussie, ID de la connexion : " + connection.threadId);
//     }

//     // Rechercher le departement dans la base de données
//     const departement = req.query.departement;
//     pool.getConnection((err, connection) => {
//     // Interroger la base de données pour obtenir les classes du département
//     connection.query('SELECT classe FROM emplois WHERE depart = ?', [departement], (err, results) => {
//         if (err) {
//             console.error('Erreur lors de la récupération des classes : ', err);
//             return res.status(500).json({ error: 'Erreur lors de la récupération des classes' });
//         }

//         // Renvoyer les classes dans la réponse
//         const classes = results.map(row => row.classe);
//         res.json({ classes });
//     }); 

// });
// };