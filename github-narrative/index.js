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
    if (src.hasOwnProperty(key)) { obj[key] = src[key]; }
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
    issues = {};

while (true) {
  console.log('url: ', next);
  var res = getpage(next);

  console.log('res.body: ', res.body);

  issues = extend(issues, res.body);

  if(!res.links.next) { break; }
  next = res.links.next.url;

}



console.log('here are ALL of the issues: \n\n', issues);



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
