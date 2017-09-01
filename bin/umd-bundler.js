#!/usr/bin/env node

const argv = require('yargs')
  .option('globals', {
    alias: 'g'
  })
  .option('name', {
    alias: 'n'
  })
  .option('input', {
    alias: 'i'
  })
  .option('output', {
    alias: 'o'
  })
  .argv;

require('../src/index')(argv);
