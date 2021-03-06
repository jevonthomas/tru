'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./account'));
router.use(require('./externalApi'));
router.use(require('./signin'));
router.use(require('./event'));
router.use(require('./causes'));

module.exports = router;
