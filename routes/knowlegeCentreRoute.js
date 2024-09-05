const express = require('express');

const router = express.Router();

const knowledgeCentreController = require('../controllers/knowledgeCentreController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new Knowledge Centre entry || POST
router.post('/create',  knowledgeCentreController.createKnowledgeCentre);

// Additional routes for the Knowledge Centre can be added here
// For example:
router.get('/get-all', authMiddleware, knowledgeCentreController.getAllKnowledgeCentres);
router.get('/get-all-for-web', knowledgeCentreController.getAllKnowledgeCentres);
router.get('/get-one/:id',  knowledgeCentreController.getKnowledgeCentreById);

module.exports = router;
