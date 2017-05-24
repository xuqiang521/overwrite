var express = require('express')
var opn = require('opn')
var chalk = require('chalk')
var app = express()

var port = process.env.NODE_ENV || 9000;

var uri = "http://localhost:" + port

opn(uri)


// app.listen(port, function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   var uri = "http://localhost:" + port
//   var localUri = "http://127.0.0.1:" + port
//
//   console.log(chalk.yellow('Starting up http-server, serving ...'))
//   console.log(chalk.yellow('Available on:'))
//
//   console.log("  Listening at port: " + uri);
//   console.log("  Listening at port: " + localUri + '\n');
//
//   if (process.env.NODE_ENV !== 'testing') {
//     opn(uri)
//   }
// })
