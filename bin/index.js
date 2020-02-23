#!/usr/bin/env node

const request = require('request');
const chalk = require('chalk')
const version = require('../lib/version')
const readline = require('readline');

var url = 'https://dock-menu-api.herokuapp.com/menu'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var getMenu = function () {
  console.log(chalk.blueBright('Attempting to get menu...'))
  request
    .get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log(chalk.red('Error:', err));
        } else if (res.statusCode !== 200) {
          console.log(chalk.red('Status:', res.statusCode));
        } else {
          console.log(chalk.green('Get successful!\n'))

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
  var updateText = chalk.green('An update is available! Please run < ') + chalk.white('npm update -g dock-menu') + chalk.green(' > to update!\n')

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
  console.log(chalk.blueBright('Menu:\n'))
  data.menu.forEach(day => {
    console.log(chalk.cyan(' -- ' + day.day))
    console.log(chalk.white('    ' + day.option + '\n'))
  });

  rl.question(chalk.blueBright('Show soup menu? y/n '), (answer) => {
    if (answer == 'y') {
      console.log(chalk.blueBright('\nSoup:\n'))

      data.soup.forEach(day => {
        console.log(chalk.cyan(' -- ' + day.day))
        console.log(chalk.white('    ' + day.option + '\n'))
      });
    }

    console.log(chalk.blueBright('Thanks for using dock-menu!'))
    rl.close();
  });
}

if (process.argv.length < 3) {
  console.log('please provide a password using \"dock-menu <password>\"')
} else {
  getMenu()
}