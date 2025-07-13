import { Pool } from 'pg';
import dotenv from 'dotenv';
import { createUsersTable, createTodoTable, createNoteTable } from './tables';
dotenv.config();


const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

async function connect() {
  try {
    await pool.connect();
    createUsersTable(pool);
    createTodoTable(pool);
    createNoteTable(pool);
  } catch (error) {
    throw error;
  }
}

async function disconnect() {
  try {
    await pool.end();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    throw error;
  }
}

export { pool , connect, disconnect };
