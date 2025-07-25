//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Online Journey:

// Routes for v4
router.use('/v4', require('./views/v4/\_routes'));

// Routes for v3.1
router.use('/v3-1', require('./views/v3/\_routes'));

// Routes for v3
router.use('/v3', require('./views/v3/\_routes'));

// Routes for v2
router.use('/v2', require('./views/v2/\_routes'));

// Routes for v1
router.use('/v1', require('./views/v1/\_routes'));

// Offline Journey:

// Routes for v1
router.use('/offline-v1', require('./views/offline-v1/\_routes'));
