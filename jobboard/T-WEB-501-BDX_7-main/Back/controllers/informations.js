import mariadb from 'mariadb'
import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';
import date from 'date-and-time';

const app = express();

const now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'azerty974',
    database: 'JobBoard',
    connectionLimit: 5
});
 
app.use(cookieParser());

    const createInfo = async (req,res) => {  //envoie les données de l'utilisaateur vers le serveur
        try {
            const sql = "INSERT INTO informations (infoStatus, DateInfo) VALUES (?,?)";
    
            const values = [
                 
                req.body.infoStatus,
                DateInfo = date.parse(now, pattern)
            ];

            const conn = await pool.getConnection();
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
    
const getInfos = async (req,res) => {
    let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM informations');
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

const deleteInfo = async (req,res) =>{ //delete un user par son id
    const idInfo = req.params.idInfo;

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM informations WHERE id = ?', [idInfo]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Info deleted successfully' });
    } else {
      res.status(404).json({ error: 'Info not found' });
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

const updateInfo = async (req, res) => {
    const idInfo = req.params.idInfo;
    const updatedInfoData = req.body; // Assuming the updated company data is sent in the request body
  
    let conn;
    try {
      conn = await pool.getConnection();
      
      // Check if the company exists
      const checkInfo = await conn.query('SELECT * FROM informations WHERE idInfo = ?', [idInfo]);
      if (checkInfo.length === 0) {
        return res.status(404).json({ error: 'Info not found' });
      }
  
      // Update the company data
      await conn.query('UPDATE informations SET Name = ?, LastName = ?,img = ?,CV = ?, Mail = ?,Phone =?, WHERE idCompany = ?',
        [ updatedInfoData.infoStatus, idInfo]);
        DateInfo = date.parse(now, pattern);
      res.json({ message: 'Info updated successfully' });
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  };

export  {createInfo, getInfos, deleteInfo, updateInfo}
