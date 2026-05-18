import {Router} from 'express'
import authMiddleware from '../middlewares/authenticate.middleware'
import roleAuth from '../middlewares/role.middleware'
import leadsController from '../controllers/leads.controller'


const router = Router()

router.use(authMiddleware)

router.post('/create', leadsController.createLead);
router.get('/all', leadsController.getAllLeads);
router.get('/', leadsController.getLeadById);
router.patch('/', leadsController.updateLead);
router.delete('/', roleAuth('ADMIN'), leadsController.deleteLead);

export default router