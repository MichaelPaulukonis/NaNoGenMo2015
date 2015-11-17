var request = require('sync-request'),
    parse = require('parse-link-header'),
    config = require('./config');

// temporary hard-coded username
// https://developer.github.com/v3/activity/events/
// can only grab last 90 days of events/300 items
// whichever is less
// var url = 'https://api.github.com/users/MichaelPaulukonis/events';
var url = 'https://api.github.com/repos/dariusk/NaNoGenMo-2015/issues';

var extend = function(obj, src) {
  for (var key in src) {
    console.log('key', key);
    if (src.hasOwnProperty(key)) {
      console.log('yes!');
      obj[key] = src[key];
    }
  }
  return obj;
};

// let's do this syncronously becuase... :::sigh:::
// quicker ?
var getpage = function(url) {

  var res = request('GET', url,
                    { headers: { 'user-agent': 'node.js',
                               'access_token': config.access_token }});
  var parsed = parse(res.headers.link);

  return { body: JSON.parse(res.getBody('utf8')), links: parsed };

};

var next = url,
    issues = [];

while (true) {
  // console.log('url: ', next);
  var page = getpage(next);

  // console.log('page.body: ', page.body);

  issues = issues.concat(page.body); // extend(issues, page.body);

  if(!page.links.next) { break; }
  next = page.links.next.url;

}

// This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
// '1445861152000'
// > new Date('2015-10-26T12:05:52Z').toString()
// 'Mon Oct 26 2015 08:05:52 GMT-0400 (Eastern Daylight Time)'
// console.log('here are ALL of the issues: \n\n', issues);

for (var i = 0; i < issues.length; i++) {

  var issue = issues[i],
      openDate = new Date(issue.created_at).toString(),
      name = issue.user.login,
      title = issue.title;

  // TODO: format the openDate to remoce the GMT stuff

  console.log(`On ${openDate}, ${name} opened a new issue called "${title}".`);

}

// TODO: optionally parse a local copy of file

// actually, this looks really good, too:
// https://www.npmjs.com/package/github-scraper

// [...]
//      { url: '/dariusk/NaNoGenMo-2015/issues/137',
//        title: 'Automatic Essay Grading + (Markov Chains | Genetic Algorithm) = Novel?',
//        created: '2015-11-05T15:23:39Z',
//        author: 'nicholasg3',
//        comments: 1,
//        labels: [] },
//      { url: '/dariusk/NaNoGenMo-2015/issues/136',
//        title: 'The TPP: A "Found" Generated Novel',
//        created: '2015-11-05T14:24:46Z',
//        author: 'coleww',
//        comments: 6,
//        labels: [Object] } ],
//   url: 'https://github.com/dariusk/nanogenmo-2015/issues',
//   open: 159,
//   closed: 0,
//   next_page: '/dariusk/nanogenmo-2015/issues?page=2&q=is%3Aissue+is%3Aopen' }
