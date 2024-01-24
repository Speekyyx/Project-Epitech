import { Router } from 'express';

import controller from '../controllers/companies.js';
const { createCompany,  getCompanyProfile, deleteCompany, updateCompany,verifyAdmin,adminDashboardCompanies} = controller;

const router = Router();

// toutes les routes ici commencent par /Companies

router.post('/', createCompany);

router.get('/', getCompanyProfile);

router.delete('/:idCompany', deleteCompany);

router.put('/:idCompany', updateCompany);
router.get('/admin/dashboard',verifyAdmin, adminDashboardCompanies);  // Seuls les administrateurs peuvent accéder au tableau de bord de l'admin

export default router;