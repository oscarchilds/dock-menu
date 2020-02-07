#!/usr/bin/env node

const request = require('request');
const version = require('../lib/version')

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

          checkForUpdates(data)
          printMenu(data)
        }
    })
    .auth(
      'dock-menu-npm',
      process.argv[2]
    )
}

var checkForUpdates = function (data) {
  var versionArray = version.split('.')
  var currentVersion = data.currentVersion.split('.')
  var updateText = 'An update is available! Please run <npm update -g dock-menu> to update!'

  if (currentVersion[0] > versionArray[0]) {
    console.log(updateText)
  }
  else if (currentVersion[0] == versionArray[0] && currentVersion[1] > versionArray[1]) {
    console.log(updateText)
  }
  else if (currentVersion[0] == versionArray[0] && currentVersion[1] == versionArray[1] && currentVersion[2] > versionArray[2]) {
    console.log(updateText)
  }
}

var printMenu = function (data) {
  var menuTable = data.menu.reduce((acc, {day, ...x}) => { acc[day] = x; return acc}, {})
  console.table(menuTable)

  var soupTable = data.soup.reduce((acc, {day, ...x}) => { acc[day] = x; return acc}, {})
  console.table(soupTable)
}

if (process.argv.length < 3) {
  console.log('please provide a password using \"dock-menu <password>\"')
} else {
  getMenu()
}