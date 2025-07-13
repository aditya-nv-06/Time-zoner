import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createTodo = (req: Request, res: Response) => {
  const { userId, title } = req.body;
  if (!userId || !title) {
     res.status(400).json({ error: 'userId and title are required' });
  }
  pool.query(
    'INSERT INTO todotable (title, user_id) VALUES ($1, $2) RETURNING *',
    [title, userId]
  )
    .then(result => {
       res.status(201).json({ message: 'Todo created successfully', todo: result.rows[0] });
    })
    .catch(error => {
      console.error('Error creating todo:', error);
       res.status(500).json({ error: 'Internal server error' });
    });
};

export const getTodos = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
      res.status(400).json({ error: 'user_id parameter is required' });
  }
  const userIdNum = parseInt(id, 10);
  if (isNaN(userIdNum)) {
     res.status(400).json({ error: 'user_id must be a valid number' });
  }
  pool.query('SELECT * FROM todotable WHERE user_id = $1', [userIdNum])
    .then(result => {
       res.status(200).json({ todos: result.rows });
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
       res.status(500).json({ error: 'Internal server error' });
    });
};

 export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
     res.status(400).json({ error: 'todo_id parameter is required' });
  }
  const todoIdNum = parseInt(id, 10);
  if (isNaN(todoIdNum)) {
     res.status(400).json({ error: 'todo_id must be a valid number' });
  }
  pool.query(
    'UPDATE todotable SET completed = TRUE WHERE id = $1 RETURNING *',
    [todoIdNum]
  )
    .then(result => {
      if (result.rows.length === 0) {
         res.status(404).json({ error: 'Todo not found' });
      }
       res.status(200).json({ message: 'Todo updated successfully', todo: result.rows[0] });
    })
    .catch(error => {
      console.error('Error updating todo:', error);
       res.status(500).json({ error: 'Internal server error' });
    });
};

export const deleteTodo = (req:Request, res: Response) => {

  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'todo_id parameter is required' });
  }

  const todoIdNum = parseInt(id, 10);

  if (isNaN(todoIdNum)) {
    res.status(400).json({ error: 'todo_id must be a valid number' });
  }

  pool.query(
   'DELETE FROM todotable WHERE id = $1 RETURNING *',
   [todoIdNum]
  )
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(200).json({ message: 'Todo deleted successfully', todo: result.rows[0] });
      }
    })
    .catch(error => {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal server error' });
    });

}





