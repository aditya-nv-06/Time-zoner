import { Request,Response } from 'express';
import { pool } from '../config/db';

const createNote = (req:Request,res:Response) => {
   const { userId,content } = req.body;

  if (!userId || !content) {
      res.status(400).json({ error: 'userId and content are required' });
      return;
  }

  pool.query('INSERT INTO notetable(user_id,content) VALUES ($1,$2) RETURNING *',[userId,content])
    .then(result => {
        res.status(201).json({ message: 'Note created successfully', note: result.rows[0] });
    })
    .catch(error => {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

const getNotes = (req:Request,res:Response) => {
  const { id } = req.params;

  pool.query('SELECT * FROM notetable WHERE  user_id=$1',[id])
  .then(result => {
      if (result.rows.length === 0) {
          res.status(404).json({ error: 'No notes found for this user' });
          return;
      }
      res.status(200).json({ notes: result.rows });
  })
  .catch(error => {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Internal server error' });
  });
}

const deleteNoteById = (req:Request,res:Response) => {
  const {id} = req.params;

  pool.query('DELETE FROM notetable WHERE id=$1 RETURNING *',[id])
  .then(result =>{
      if(result.rows.length === 0){
        res.status(404).json({ error: 'Note not found' });
        return;
      }
      res.status(200).json({ message: 'Note deleted successfully', note: result.rows[0] });
    })
}
export { createNote, getNotes, deleteNoteById };
