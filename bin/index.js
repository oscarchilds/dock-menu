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

          var menuTable = data.menu.reduce((acc, {day, ...x}) => { acc[day] = x; return acc}, {})

          console.table(menuTable)
        }
    })
    .auth(
      'dock-menu-npm',
      process.argv[2]
    )
}

if (process.argv.length < 3) {
  console.log('please provide a password using \"dock-menu <password>\"')
} else {
  getMenu()
}