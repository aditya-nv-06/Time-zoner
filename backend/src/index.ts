import express from 'express';
import { connect } from './config/db';
import BasicRouter from './routes/UserRoute';
import TodoRouter from './routes/TodoRoute';
import NoteRouter from './routes/NoteRoute';
import { auth } from './middleware/auth';
import cors from 'cors';
const backend = express();

backend.use(cors());

connect().then(()=>{
  console.log('Connected to the database successfully');
  
  backend.use(express.json());
 
  backend.use('/api/basic', BasicRouter);
  backend.use('/api/todos',auth, TodoRouter);
  backend.use('/api/notes',auth, NoteRouter);
}).catch((Error) => {
  console.error('Error connecting to the database:', Error);
  process.exit(1);
});

backend.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});
