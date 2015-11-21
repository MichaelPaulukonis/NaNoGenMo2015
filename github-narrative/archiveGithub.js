'use strict';

var archive = function(filename, url) {

  var request = require('sync-request'),
      parse = require('parse-link-header'),
      config = require('./config');

  url = (url != undefined ? url : 'https://api.github.com/repos/dariusk/NaNoGenMo-2015/issues');

  if (filename === undefined) {
    throw new Error('filename (1st parameter) must be provided');
  }

  // let's do this syncronously becuase... :::sigh:::
  // quicker ?
  var getpage = function(url) {

    var res = request('GET', url,
                      { headers: { 'user-agent': 'node.js',
                                   'Authorization': 'token ' + config.access_token }});

    var parsed = parse(res.headers.link);

    return { body: JSON.parse(res.getBody('utf8')), links: parsed };

  };

  var next = url,
      issues = [],
      nextPageExists = true;

  while (nextPageExists) {

    let page = getpage(next);

    // at this point, page.body is an array of issues
    for (var i = 0; i < page.body.length; i++) {
      let issue = page.body[i];
      issue.events = getpage(issue.events_url).body;
      issue.comments = getpage(issue.comments_url).body;
    }

    issues = issues.concat(page.body);

    if(!(page.links && page.links.next)) {
      nextPageExists = false;
    } else {
      next = page.links.next.url;
    }

  }

  var fs = require('fs');
  fs.writeFileSync(filename, JSON.stringify(issues, null, 2));

};


module.exports = archive;
