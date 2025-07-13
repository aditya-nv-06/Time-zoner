import { Router } from 'express';
import { createTodo, getTodos, updateTodo,deleteTodo } from '../controller/Todo';
const router = Router();

router.post('/create', createTodo);
router.get('/:id', getTodos);
router.put('/update/:id', updateTodo);
router.delete('/delete/:id', deleteTodo);

export default router;
