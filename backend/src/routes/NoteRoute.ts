import { createNote,getNotes,deleteNoteById } from '../controller/Note';
import { Router } from 'express';

const router = Router();

router.post('/create',createNote);
router.get('/:id', getNotes);
router.delete('/delete/:id', deleteNoteById);

export default router;
