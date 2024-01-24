import { Router } from 'express';

import { createInfo, getInfos, deleteInfo, updateInfo} from '../controllers/informations.js';

const router = Router();

// toutes les routes ici commencent par /informations
router.get('/', getInfos);

router.post('/', createInfo);

router.delete('/:id', deleteInfo)

router.patch(':id', updateInfo)

export default router;