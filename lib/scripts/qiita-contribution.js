// Description
//   A Hubot script that returns Qiita contribution
//
// Configuration:
//   None
//
// Commands:
//   hubot qiita contribution <user> - Qiita contribution
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/qiita contribution (\S+)$/i, function(res) {
    var name, url;
    name = res.match[1];
    url = 'https://qiita.com/' + name;
    return request({
      method: 'GET',
      url: url
    }).then(function(r) {
      var $;
      $ = cheerio.load(r.body);
      return res.send($('#user-info-box .count').text());
    });
  });
};
