'use strict';

const fastify = require('../src');
const assert = require('assert').strict;

assert.strictEqual(fastify(), 'Hello from fastify');
console.info("fastify tests passed");
