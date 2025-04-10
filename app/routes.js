//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Routes for v3
router.use('/v3', require('./views/v3/\_routes'));

// Routes for v2
router.use('/v2', require('./views/v2/\_routes'));

// Routes for v1
router.use('/v1', require('./views/v1/\_routes'));
