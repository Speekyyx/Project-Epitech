import { Router } from 'express';

import { createAdvertisement, getAdvertisements,  deleteAdvertisement, updateAdvertisement } from '../controllers/advertisement.js';

const router = Router();

// toutes les routes ici commencent par /Advertisements
router.get('/', getAdvertisements);

router.post('/', createAdvertisement);

router.delete('/:id', deleteAdvertisement)

router.patch(':id', updateAdvertisement)

export default router;