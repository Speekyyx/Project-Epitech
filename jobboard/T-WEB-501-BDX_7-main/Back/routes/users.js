import { Router } from 'express';
import usersRoutes from '../controllers/users.js';

const { getUsers, createUser, deleteUser, updateUser, loginUser,verifyAdmin,adminDashboard} = usersRoutes;
const router = Router();

// Toutes les routes ici commencent par /users
router.get('/',getUsers);  

router.post('/', createUser);  

router.get('/profile');  

router.get('/admin');  

router.delete('/:idUsers',deleteUser);  

router.put('/:idUsers',updateUser);  

router.post('/login',loginUser);  
router.get('/admin/dashboard',verifyAdmin, adminDashboard);  // Seuls les administrateurs peuvent accéder au tableau de bord de l'admin

export default router;
