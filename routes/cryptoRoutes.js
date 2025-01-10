const express = require('express');
const { getCryptoStats, getCryptoDeviation } = require('../controllers/cryptoController');

const router = express.Router();

// Route for fetching crypto stats
router.get('/stats', getCryptoStats);

// Route for calculating crypto deviation
router.get('/deviation', getCryptoDeviation);

module.exports = router;
