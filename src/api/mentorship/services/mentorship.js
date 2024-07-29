'use strict';

/**
 * mentorship service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mentorship.mentorship');
