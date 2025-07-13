import  { Request, Response } from 'express';
import { pool } from '../config/db';
import jwt from 'jsonwebtoken';

const Login = (req: Request,res : Response) =>{
  const { username , password } = req.body;
  pool.query('SELECT * FROM usertable WHERE username = $1 AND password = $2', [username, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
     if (results.rows.length > 0) {
        const authSecret = process.env.AUTH_SECRET;
        if (!authSecret) {
          console.error('AUTH_SECRET is not set in environment variables.');
          return res.status(500).json({ error: 'Internal server error' });
        }
         const token  = jwt.sign({ username },authSecret);

        res.cookie('token', token, {
          httpOnly: true,
        });
      return res.status(200).json({ message: 'Login successful', token, user: results.rows[0] });
    }
    else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
}

const Register = (req: Request, res: Response) => {
  const { username, password ,email } = req.body;

  pool.query('INSERT INTO usertable (username, password,email) VALUES ($1, $2,$3) RETURNING *', [username, password,email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'User registered successfully', user: results.rows[0] });
  });
};

const Logout = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
     res.json({ error: 'User ID is required for logout' });
  }
  res.status(200).json({ message: 'Logout successful' });
}
export { Login, Register, Logout };
