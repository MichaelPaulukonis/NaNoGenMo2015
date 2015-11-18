var narrative = function(filename) {

  var request = require('sync-request'),
      parse = require('parse-link-header'),
      config = require('./config');

  // temporary hard-coded username
  // https://developer.github.com/v3/activity/events/
  // can only grab last 90 days of events/300 items
  // whichever is less
  // var url = 'https://api.github.com/users/MichaelPaulukonis/events';
  var url = 'https://api.github.com/repos/dariusk/NaNoGenMo-2015/issues';


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
      issues = [];

  // something's not quite right, here....
  if (filename === undefined && config.use_local) {
    issues = require(config.local_file);
  } else {

    while (true) {
      // console.log('url: ', next);
      var page = getpage(next);

      // at this point, page.body is an array of issues
      // loop through each, getting both the comments and events

      for (var i = 0; i < page.body.length; i++) {
        var issue = page.body[i];
        issue.events = getpage(issue.events_url).body;
        issue.comments = getpage(issue.comments_url).body;
      }

      issues = issues.concat(page.body); // extend(issues, page.body);

      if(!page.links.next) { break; }
      next = page.links.next.url;

    }

  }

  if (filename !== undefined) {
    var fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(issues, null, 2));

    process.exit();

  }

  // This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  // > new Date('2015-10-26T12:05:52Z').toString()
  // 'Mon Oct 26 2015 08:05:52 GMT-0400 (Eastern Daylight Time)'


  var isAdmin = function(issue) {
    var isAdmin = false;

    var labels = (issue.labels !== undefined ? issue.labels : []);

    for (var i = 0; i < labels.length; i++) {
      if (labels[i].name === 'admin') {
        isAdmin = true;
        break;
      }
    }

    return isAdmin;
  };

  var isCompleted = function(issue) {
    var isCompleted = false;

    var labels = (issue.labels !== undefined ? issue.labels : []);

    for (var i = 0; i < labels.length; i++) {
      if (labels[i].name === 'completed') {
        isCompleted = true;
        break;
      }
    }

    return isCompleted;
  };


  var narrate = function(issues) {

    var txt = [];

    // TODO: get a sorted list
    // TODO: create Event objects
    // those will be sorted next
    // Events will have properties like notability or interest, or summat

    issues.sort(function(a,b) {
      // a = new Date(a.created_at);
      // b = new Date(b.created_at);
      // return a > b ? -1 : a < b ? 1 : 0;
      return new Date(a.created_at) - new Date(b.created_at);
    });

    for (var i = 0; i < issues.length; i++) {

      var issue = issues[i],
          openDate = new Date(issue.created_at).toString().replace(/ GMT.*/, ''),
          name = issue.user.login,
          title = issue.title;

      // some variations and comments on notable things
      // morning, afternoon, evening, middle-of-the-night (which will not be accurate, but whatevs)

      var msg = [`On ${openDate}, ${name} opened a new issue called "${title}".`];

      // this is crude, horrible, and also crude. PROOF OF CONCEPT, OK?
      if (isAdmin(issue)) {
        msg.push('But it\'s an admin issue, so who cares?');
      } else if (isCompleted(issue)) {
        msg.push('And it\'s been completed. Sweet!');
      }

      txt.push(msg.join(' '));

    }

    return txt.join('\n');

  };


  // console.log(JSON.stringify(issues, null, 2));

  var text = narrate(issues);

  console.log(text);

  //https://api.github.com/repos/dariusk/NaNoGenMo-2015/issues/161/events

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


};


var program = require('commander');

program
  .version('0.0.1')
  .option('-a, --archive', 'save to json file')
  .option('-n --name [string]', 'name of archive file', 'archive.json')
  .parse(process.argv);

console.log(program);

if (program.archive !== undefined) {
  narrative(program.name);
} else {
  narrative();
};
