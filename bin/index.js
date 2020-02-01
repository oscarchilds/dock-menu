#!/usr/bin/env node

var request = require('request');

var url = 'https://dock-menu-api.herokuapp.com/menu'

var getMenu = function () {
  console.log('Attempting to get menu...')
  request
    .get({
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
    })
    .auth(
      'dock-menu-npm',
      process.argv[2]
    )
}

if (process.argv.length < 3) {
  console.log('please provide a password using \"dock-menu\" <password>')
} else {
  getMenu()
}