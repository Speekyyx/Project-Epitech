import mariadb from 'mariadb'
import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'azerty974',
    database: 'JobBoard',
    connectionLimit: 10000
});
 
app.use(cookieParser());

    const createCompany = async (req,res) => {  //envoie les données de l'utilisaateur vers le serveur
      const conn = await pool.getConnection();
        try {
            const sql = "INSERT INTO Companies (NameCompany, MailCompany, Adress, Description) VALUES (?,?,?,?)";
    
            const values = [
                req.body.NameCompany,
                req.body.MailCompany,
                req.body.Adress,
                req.body.Description
            ];
                const response = await conn.query(sql, values).catch(err => {
                console.error("Error executing query:", err);
            });
            
            conn.release();
    
            res.json({ Status: 'success' });
    
        } catch (err) {
            conn && conn.release();
            console.error("Error executing query:", err);
            res.status(500).json({ Error: err.message });
        }
    }
    
const getCompanyProfile = async (req,res) => {
    let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM Companies');
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

const deleteCompany = async (req,res) =>{ //delete un user par son id
    const idCompany = req.params.idCompany;

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM Companies WHERE idCompany = ?', [idCompany]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Company deleted successfully' });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

const updateCompany = async (req, res) => {
  const idCompany = req.params.idCompany;
  const updatedUserData = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    // Check if the user exists
    const checkUser = await conn.query('SELECT * FROM Companies WHERE idCompany = ?', [idCompany]);
    if (checkUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user data
    await conn.query(
      'UPDATE Companies SET NameCompany = ?, MailCompany = ?, Adress = ?, Description = ? WHERE idCompany = ?',
      [
        updatedUserData.NameCompany,
        updatedUserData.MailCompany,
        updatedUserData.Adress,
        updatedUserData.Description,
        idCompany,
      ]
    );

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) conn.end();
  }
};

  const verifyAdmin = (req, res, next) => {
    // Récupérer le token du header 'Authorization'
    const token = req.header('authorization').split(' ')[1];
    if (!token) return res.status(401).send('Access Denied: No Token Provided');
  
    try {
        // Vérifier le token
        const verified = jwt.verify(token, "jwt-secret-key");
        if (verified && verified.isAdmin) {
            req.user = verified;
            next();  // Si c'est un admin, continuer vers la prochaine fonction middleware/route
        } else {
            res.status(403).send('Access Denied: Not Admin');
        }
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
  };

  const adminDashboardCompanies = async (req, res) => {
    try {
        const conn = await pool.getConnection();  // Assurez-vous que 'pool' est correctement importé
        const result = await conn.query("SELECT * FROM Companies");  // Remplacez 'Users' par 'Companies'
        
        res.json({
            message: "Liste des entreprises enregistrées",
            companies: result  // Remplacez 'users' par 'companies'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Erreur du serveur: ${err.message}`);
    }
  };


export default {createCompany, getCompanyProfile, deleteCompany, updateCompany,verifyAdmin,adminDashboardCompanies}
