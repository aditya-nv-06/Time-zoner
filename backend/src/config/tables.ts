import { Pool } from 'pg';

const UserQuery: string = `
CREATE TABLE IF NOT EXISTS UserTable (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;


const TodoQuery: string =`
  CREATE TABLE IF NOT EXISTS TodoTable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES UserTable(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const NoteQuery: string = `
CREATE TABLE IF NOT EXISTS NoteTable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES UserTable(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createUsersTable = async (pool: Pool): Promise<void> =>{
  try {
    await pool.query(UserQuery);
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

const createTodoTable = async (pool: Pool): Promise<void> => {
  try {
    await pool.query(TodoQuery);
  } catch (error) {
    console.error('Error creating todo table:', error);
    throw error;
  }
}

const createNoteTable = async (pool: Pool): Promise<void> => {
  try {
    await pool.query(NoteQuery);
  } catch (error) {
    console.error('Error creating note table:', error);
    throw error;
  }
}

export { createUsersTable, createTodoTable, createNoteTable};
