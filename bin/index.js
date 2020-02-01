#!/usr/bin/env node

var request = require('request');

var url = 'https://dock-menu-api.herokuapp.com/menu'

console.log('Attempting to get menu...')
request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      console.log('Get successful!\n')

      console.table(data.menu)
    }
});