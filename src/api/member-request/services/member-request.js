'use strict';

/**
 * member-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::member-request.member-request');
