import { Router } from 'express';
import { basic } from '../controller/basic';
import { Register, Login , Logout} from '../controller/User';

const router = Router();

router.get('/', basic);
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout/:id',Logout);

export default router;
