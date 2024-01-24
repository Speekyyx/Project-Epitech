import express from 'express';
import { json } from 'body-parser';
import { genSalt, hash } from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const port = 5500;

// Créer une instance sequelize pour la connexion à la base de données.
const sequelize = new Sequelize('JobBoard', 'root', 'azerty974', {
    host: 'localhost',
    dialect: 'mariadb'
});

// Définir le modèle User.
const Users = sequelize.define('Users', {
    idUsers: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Users',
});


// Synchroniser les modèles avec la base de données.
sequelize.sync();

app.use(json());

app.post('/users', async (req, res) => {
    try {
        // Validation des données d'entrée
        if (!req.body.firstName ||!req.body.LastName || !req.body.Password || !req.body.Mail) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        // Hachage du mot de passe avec bcrypt
        const salt = await genSalt(10);
        const hashedPassword = await hash(req.body.password, salt);

        // Insertion des données dans la base de données avec Sequelize.
        const newUser = await User.create({
            firstName: req.body.firstName,
            LastName: req.body.LastNameastName || null,  // Optionnel, donc permettez null si non fourni
            Password: hashedPassword,
            Mail: req.body.Mail
        });
        // Vérification de l'utilisateur
        const fetchedUser = await User.findByPk(newUser.id);
        if (fetchedUser.Mail === req.body.Mail) {
            console.log("User was saved and can be retrieved from DB!");
            res.json({ success: true, message: 'User created successfully!', User: newUser });
        } else {
            console.log("There may be an issue with data storage or retrieval.");
            res.status(500).json({ success: false, message: 'User created but verification fetch failed.' });
        }

        } catch (err) {
            console.log(err); 
            res.status(500).json({ success: false, message: 'An error occurred while creating the user.' });
        }   
    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
