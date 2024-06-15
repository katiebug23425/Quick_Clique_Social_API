const router = require('express').Router();
const apiRoutes = require('./api-routes');
router.use('/api', apiRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;