import mariadb from 'mariadb'
import express from 'express';
import cookieParser from 'cookie-parser';
import date from 'date-and-time';

const app = express();

const now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm');

// Middleware setup
app.use(cookieParser());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'azerty974',
    database: 'JobBoard',
    connectionLimit: 5
});
const createAdvertisement = async (req, res) => {
    try {

        const sql = "INSERT INTO advertisements (NamePost, AboutPost, Salary, postDate, jobtype) VALUES (?,?,?,?,?)";


        const values = [
            req.body.NamePost,
            req.body.AboutPost,
            req.body.Salary,
            postDate = date.parse(now, pattern),
            req.body.jobtype
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

const getAdvertisements = async (req, res) => {

    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM advertisements');
      res.json(rows);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  const deleteAdvertisement = async (req,res) =>{ //delete un user par son id
    const idPost = req.params.idPost;

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM advertisements WHERE id = ?', [idPost]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Advertisement deleted successfully' });
    } else {
      res.status(404).json({ error: 'Advertisement not found' });
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

const updateAdvertisement = async (req, res) => {
    const idPost = req.params.idPost;
    const updatedAdvertisementData = req.body; // Assuming the updated user data is sent in the request body
  
    let conn;
    try {
      conn = await pool.getConnection();
      
      // Check if the user exists
      const checkUser = await conn.query('SELECT * FROM Advertisement WHERE idPost = ?', [idPost]);
      if (checkAdvertisement.length === 0) {
        return res.status(404).json({ error: 'Advertisement not found' });
      }
  
      // Update the user data
      await conn.query('UPDATE advertisements SET jobtype = ?, postDate = ?,Salary = ?, postDate = ?,AboutPost = ?, NamePost = ? WHERE idUsers = ?',
        [updatedAdvertisementData.jobtype,updatedAdvertisementData.postDate,updatedAdvertisementData.Salary,updatedAdvertisementData.AboutPost, updatedAdvertisementData.NamePost, idPost]);
        postDate = date.parse(now, pattern);
      res.json({ message: 'Advertisement updated successfully' });
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  };

export  {createAdvertisement, getAdvertisements, deleteAdvertisement, updateAdvertisement}
