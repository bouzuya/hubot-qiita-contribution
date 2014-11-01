# Description
#   A Hubot script that returns Qiita contribution
#
# Configuration:
#   None
#
# Commands:
#   hubot qiita contribution <user> - Qiita contribution
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'
  robot.respond /qiita contribution (\S+)$/i, (res) ->
    name = res.match[1]
    url = 'https://qiita.com/' + name
    request
      method: 'GET'
      url: url
    .then (r) ->
      $ = cheerio.load r.body
      res.send $('#user-info-box .count').text()
