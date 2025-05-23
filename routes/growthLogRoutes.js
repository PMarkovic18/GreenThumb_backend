const express = require('express');
const router = express.Router();
const growthLogController = require('../controllers/growthLogController');

router.post('/', growthLogController.createGrowthLog);
router.get('/', growthLogController.getGrowthLogs);
router.get('/:id', growthLogController.getGrowthLogById);
router.put('/:id', growthLogController.updateGrowthLog);
router.delete('/:id', growthLogController.deleteGrowthLog);
router.get('/plant/:plantID', growthLogController.getGrowthLogsByPlantId);

module.exports = router;
