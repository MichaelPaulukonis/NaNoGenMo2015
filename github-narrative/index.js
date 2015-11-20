'use strict';

var archive = function(filename) {


  var request = require('sync-request'),
      parse = require('parse-link-header'),
      config = require('./config');

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

      let page = getpage(next);

      // at this point, page.body is an array of issues
      for (var i = 0; i < page.body.length; i++) {
        let issue = page.body[i];
        issue.events = getpage(issue.events_url).body;
        issue.comments = getpage(issue.comments_url).body;
      }

      issues = issues.concat(page.body); // extend(issues, page.body);

      if(!page.links.next) { break; }
      next = page.links.next.url;

    }
  }

  var fs = require('fs');
  fs.writeFileSync(filename, JSON.stringify(issues, null, 2));

};

// TODO: expose some of this, purely for testing
// but then, who knows....
var narrative = function() {

  var config = require('./config');

  /**

   TODO: I suppose we have several strategies available
   develop a purely linear timeline -- each event that happened
   jumping from type-to-type, as events occur

   issue-based timeline
   focus on one issue, and what happens to it.

   user-based timeline
   what specific users did


   mixed timeline -- combines pieces of the above
   based on ... some algorithm

   **/

  var getLabelTypes = function(issue) {

    var labels = (issue.labels !== undefined ? issue.labels : []);

    var labelTypes = {
      admin: false,
      completed: false,
      preview: false
    };

    for (let label of labels) {
      labelTypes.admin = (label.name === 'admin' || labelTypes.admin);
      labelTypes.completed = (label.name === 'completed' || labelTypes.completed);
      labelTypes.preview = (label.name === 'preview' || labelTypes.preview);
    }

    return labelTypes;

  };


  /**
   Event := {
   eventtype: issue|comment|label
   created_at: date
   payload: {object}
   }
   **/

  // convert the issues.json into [atom, atom]
  var getAtoms = function(issues) {

    // loop through all issues - including comments and events
    // sequence them all out, and then sort by date-thing
    // the narrative universe is made up of atoms
    // we could call them events,
    // but that is a special term for one of the types of GitHub atoms
    // and gets confusing...
    var atoms = {
      issues: [],
      comments: [],
      events: [],
      timeline: [] // issues, comments, events - interspersed
    };

    for (let issue of issues) {
      issue.labelTypes = getLabelTypes(issue);

      atoms.issues.push({ eventtype: 'issue',
                    created_at: issue.created_at,
                    payload: issue });

      if (issue.title === undefined) { console.log(issue); }

      for (let comment of issue.comments) {
        // needs to capture the particular issue it was aimed at
        // this "pure" linear-narrative makes the comments... weird.
        atoms.comments.push({ eventtype: 'comment',
                      created_at: comment.created_at,
                      payload: comment,
                      parent: issue});
      }

      for (let event of issue.events) {
        atoms.events.push({ eventtype: 'event',
                      created_at: event.created_at,
                      payload: event,
                      parent: issue});
      }
    }

    atoms.timeline = atoms.issues.concat(atoms.comments.concat(atoms.events));



    return atoms;

  };


  var formatIssue = function(event) {

    var msg = [];

    let openDate = new Date(event.created_at).toString().replace(/ GMT.*/, ''),
        issue = event.payload,
        name = issue.user.login,
        title = issue.title;

    // some variations and comments on notable things
    // morning, afternoon, evening, middle-of-the-night (which will not be accurate, but whatevs)

    msg = [`On ${openDate}, ${name} opened a new issue called "${title}".`];

    // this is crude, horrible, and also crude. PROOF OF CONCEPT, OK?
    if (issue.labelTypes.admin) {
      msg.push('But it\'s an admin issue, so who cares?');
    }

    if (issue.labelTypes.preview) {
      msg.push('There\'s a preview available.');
    }

    if (issue.labelTypes.completed) {
      msg.push('And it\'s been completed. Sweet!');
    }

    return msg;

  };

  var formatComment = function(event) {

    var msg = [],
        comment = event.payload;

    let openDate = new Date(comment.created_at).toString().replace(/ GMT.*/, ''),
        name = comment.user.login,
        body = comment.body,
        issue = event.parent;

    /**
     TODO: process the comment body.

     If it's "too large" give an extract, or something.

     **/

    msg = [`On ${openDate}, ${name} commented on issue #${issue.number}, \'${issue.title}\': "${body}"`];

    return msg;

  };

  // TODO: look at all the various types of events, and think how we'll handle them
  // or ignore them....
  var formatEvent = function(evt) {

    var msg = [],
        event = evt.payload;

    let openDate = new Date(evt.created_at).toString().replace(/ GMT.*/, ''),
        name = event.actor.login,
        body = event.event,
        issue = evt.parent;

    msg = [`On ${openDate}, ${name} evented on issue #${issue.number}, \'${issue.title}\': "${body}"`];

    return msg;

  };


  /**
   TODO: transform the issues into a list of events
   1 issue != 1 event
   since an issue can have comments, labels, etc.
   - each of which becomes their own event
   ....
   BUT will the story be told purely linearly?
   Maybe as a first draft,
   or as one strategy?
   **/
  var narrate = function(issues) {

    var txt = [];

    var atoms = getAtoms(issues);

    var sorter = function(a,b) {
      return new Date(a.created_at) - new Date(b.created_at);
    };

    atoms.issues.sort(sorter);
    atoms.comments.sort(sorter);
    atoms.events.sort(sorter);
    atoms.timeline.sort(sorter);

    // TODO: overview


    for (let atom of atoms.timeline) {
      let msg = '';
      switch (atom.eventtype) {

      case 'issue':
        msg = formatIssue(atom);
        break;

      case 'comment':
        msg = formatComment(atom);
        break;

      case 'event':
        msg = formatEvent(atom);
        break;

      default:
        msg = [`UNKNOWN EVENTTYPE ${atom.eventtype}`];

      }

      txt.push(msg.join(' ').trim());

    }

    return txt.join('\n');

  };

  var issues = require(config.local_file);
  var text = narrate(issues);

  console.log(text);


};


var program = require('commander');

program
  .version('0.0.1')
  .option('-a, --archive', 'save to json file')
  .option('-n --name [string]', 'name of archive file', 'archive.json')
  .parse(process.argv);

if (program.archive !== undefined) {
  archive(program.name); // if not provided, we go with the default
} else {
  narrative();
}
