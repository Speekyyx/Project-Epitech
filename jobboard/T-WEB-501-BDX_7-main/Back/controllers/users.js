import mariadb from 'mariadb'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware setup
app.use(cookieParser());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'azerty974',
    database: 'JobBoard',
    connectionLimit: 10000
});

const saltRounds = 10;  // specify the salt rounds

const createUser = async (req, res) => {
  const conn = await pool.getConnection();
  try {
      const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);

      const sql = "INSERT INTO Users (Name,LastName, Mail, Password) VALUES (?,?,?,?)";


      const values = [
          req.body.Name,
          req.body.LastName,
          req.body.Mail,
          hashedPassword
      ];
      const res= await conn.query(sql, values).catch(err => {
          console.error("Error executing query:", err);
      });
      
      conn.release();

      return res.json({ Status: 'success' });

  } catch (err) {
      conn && conn.release();
      console.error("Error executing query:", err);
      res.status(500).json({ Error: err.message });
  }
}
 const getUsers = async (req, res) => {

    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM Users');
      res.json(rows);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
  const loginUser = async (req, res) => {
    let data;
    console.log("test");
    const conn = await pool.getConnection();
    try {
        data = await conn.query("SELECT * FROM Users WHERE Mail = ?", [req.body.Mail]);
    } catch (err) {
        console.error("DB Error:", err);
        return res.json({ Status: 'error', Error: err.message }); // Changed data.json to res.json
    }
    console.log(data);
    if (data.length === 0) {
        return res.json({ Status: 'error', Error: 'Length === 0' }); // Changed data.json to res.json
    }
    const userData = data[0]; // Assuming data is an array and you're interested in the first object
    bcrypt.compare(req.body.Password.toString(), userData.Password, (err, compareResult) => {
        if(err) {
            return res.json({ Status: 'error', Error: err.message }); // Changed data.json to res.json
        }

        if(compareResult) {
            const Name = userData.Name;
            const isAdmin = userData.admin;
            console.log(Name);
            console.log("est ce que c'est un admin :",isAdmin);
            const token = jwt.sign({Name,isAdmin}, "jwt-secret-key", { expiresIn: '5d' });
            console.log("Token:", token);
            return res.status(200).json({ Status: 'success', token }); // Added token to response
        } else {
            return res.json({ Status: 'error', Error: 'Invalid email or password' }); // Changed data.json to res.json
        }
    });
}

 const deleteUser = async (req,res) =>{ //delete un user par son id
    const idUsers = req.params.idUsers;

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM Users WHERE idUsers = ?', [idUsers]);

    if (result.affectedRows > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

const updateUser = async (req, res) => {
  const idUsers = req.params.idUsers;
  const updatedUserData = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    // Check if the user exists
    const checkUser = await conn.query('SELECT * FROM Users WHERE idUsers = ?', [idUsers]);
    if (checkUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user data
    await conn.query(
      'UPDATE Users SET Name = ?, LastName = ?, img = ?, CV = ?, Mail = ?, Phone = ? WHERE idUsers = ?',
      [
        updatedUserData.Name,
        updatedUserData.LastName,
        updatedUserData.img,
        updatedUserData.CV,
        updatedUserData.Mail,
        updatedUserData.Phone,
        idUsers,
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
const adminDashboard = async (req, res) => {
  try {
      const conn = await pool.getConnection();  // Assurez-vous que 'pool' est correctement importé
      const result = await conn.query("SELECT * FROM Users");
      
      res.json({
          message: "Liste des utilisateurs enregistrés",
          users: result
      });
  } catch (err) {
      console.error(err);
      res.status(500).send(`Erreur du serveur: ${err.message}`);
  }
};


export default {createUser, getUsers, deleteUser, updateUser,loginUser,verifyAdmin,adminDashboard}
