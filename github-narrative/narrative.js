'use strict';

// TODO: expose some of this, purely for testing
// but then, who knows....
var narrative = function(filename, include) {

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

  // also have completed!!!
  // we should really parse the file, and find what all the unique labels are.
  // and then do something with that....
  var getLabelTypes = function(issue) {

    var labels = (issue.labels !== undefined ? issue.labels : []);

    var labelTypes = {
      admin: false,
      completed: false,
      preview: false,
      closed: false
    };

    for (let label of labels) {
      labelTypes.admin = (label.name === 'admin' || labelTypes.admin);
      labelTypes.completed = (label.name === 'completed' || labelTypes.completed);
      labelTypes.preview = (label.name === 'preview' || labelTypes.preview);
      labelTypes.closed = (label.name === 'closed' || labelTypes.closed);
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

      // TODO: this is the best handling method....
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

  // how interesting are these atoms?
  var rankAtoms = function(atoms) {

    /** issue, primarily
     however -- individual comments can be linked-to, as well.

     How many comments?
     How many labels? NO
     Completed
     Preview
     Closed = negative
     Admin is... neutral?
     How many comments link to this issue?

     Comments -- sentiment analysis?

     **/

    /**

     Loop through all issues - this'll be an O(n^2)
     1) rank by # of comments
     2) rank by labels (see above)
     3) rank by other issues that link here....

     ----

     It doesn't have to be O(n^2) does it?
     loop through issues
     capturing which issues its comments reference
     but these are tracked - IN THE OTHER ISSUE as INCOMING
     so a single-pass will get everything
     then 1 more pass to find the totals

     **/

    let issues = atoms.issues;

    // THESE NUMBERS ARE PURELY ARBITRARY
    for (let atom of issues) {

      // initialize, if not done elsewhere
      // (not expecting it, at this point)
      if (atom.rank === undefined) { atom.rank = 0; }

      var iss = atom.payload;

      // TODO: this is a naive implementation
      // non-author comments should rank higher
      if (iss.comments) { atom.rank += iss.comments.length; }

      if(!iss.labelTypes) {
        console.log('no labelTypes: ' + iss.title);
      } else {

        // rank by labels
        if (iss.labelTypes.preview) { atom.rank += 5; }
        if (iss.labelTypes.completed) { atom.rank += 20; }
        if (iss.labelTypes.closed) { atom.rank += -1; } // hrm...
        // admin isss aren't as interesting....
        if (!iss.labelTypes.admin) { atom.rank += 5; }

      }

      // console.log(`ranked '${atom.payload.title} as: ${atom.rank}`);

    }

  };

  var formatOverview = function(atoms) {

    // TODO: we need some information about the repository -- that's not in the archive!

    var msg = [];

    msg.push(`\nThere are ${atoms.issues.length} issues.`);
    msg.push(`\nThere are ${atoms.comments.length} comments.`);
    msg.push(`\nThere are ${atoms.events.length} events.`);

    // TODO: capture # of admin issues
    // TODO: capture # of preview issues
    // TODO: capture # of completed issues

    return msg.join('\n');

  };

  // TODO: should be passing in atom instead of event
  var formatIssue = function(event, interest) {

    var msg = [];

    let openDate = new Date(event.created_at).toString().replace(/ GMT.*/, ''),
        issue = event.payload,
        name = issue.user.login,
        title = issue.title,
        admin = '',
        preview = '',
        completed = '';

    // some variations and comments on notable things
    // morning, afternoon, evening, middle-of-the-night (which will not be accurate, but whatevs)

    if (interest === undefined) {

      // this is crude, horrible, and also crude. PROOF OF CONCEPT, OK?
      if (issue.labelTypes.admin) {
        admin = ' But it\'s an admin issue, so who cares?';
      }

      if (issue.labelTypes.preview) {
        preview = ' There\'s a preview available.';
      }

      if (issue.labelTypes.completed) {
        completed = ' And it\'s been completed. Sweet!';
      }

      msg = [`\nOn ${openDate}, ${name} opened a new issue called _${title}_. It has a rank of ${event.rank}.${admin}${preview}${completed}`];
    } else {
      msg = [`\n_${title}_ was opened by ${name}.`];
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

     ugh, the summarize code uses a callback
     even though it's all essentially synchronous.

     **/

    msg = [`\n  On ${openDate}, ${name} commented on issue #${issue.number}, \'${issue.title}\': "${body}"`];

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
    /**
     mentioned ''
     subscribed 'to'
     renamed
     labeled
     unlabeled
     closed
     reopened


     On Thu Nov 19 2015 04:52:16, puckey evented on issue #9, 'Press Coverage': "subscribed"
     On Thu Nov 19 2015 04:52:16, aparrish evented on issue #9, 'Press Coverage': "mentioned"
     On Thu Nov 19 2015 15:48:46, hugovk evented on issue #163, 'Salutation, twirled!': "labeled"

     **/

    if (body === 'subscribed') { body += ' to'; }

    msg = [`\nOn ${openDate}, ${name} ${body} issue #${issue.number}, _${issue.title}_.`];

    return msg;

  };


  var narrate = function(issues, include) {

    var txt = [];

    var atoms = getAtoms(issues);
    rankAtoms(atoms);

    // oldest first
    var dateSorter = function(a,b) {
      return new Date(a.created_at) - new Date(b.created_at);
    };

    // highest first
    var rankSorter = function(a,b) {
      return (b.rank == a.rank ? dateSorter(a,b) : b.rank - a.rank);
    };

    atoms.issues.sort(rankSorter);
    atoms.comments.sort(dateSorter);
    atoms.events.sort(dateSorter);
    atoms.timeline.sort(dateSorter);

    txt.push(formatOverview(atoms));


    var interestingCount = 10;
    txt.push(`\nThe top ${interestingCount} issues, ranked:`);

    // this lists issues by rank
    // how to pick which we want?
    // or... are they separate things?
    let interest = true;
    // for (let atom of atoms.issues) {
    for (let i = 0; i < interestingCount; i++) {
      let atom = atoms.issues[i];
      let msg = formatIssue(atom, interest);
      txt.push(msg.join('\n'));
    }

    txt.push('');

    var includeIssues = include.indexOf('issues') >= 0;
    var includeComments = include.indexOf('comments') >= 0;
    var includeEvents = include.indexOf('events') >= 0;

    // TODO: pass in parameters to 'ignore/include' certain types
    // so we don't have to comment things out....
    // note: the timeline is date sorted, not rank-sorted (as only the issues are rank-sorted)
    for (let atom of atoms.timeline) {
      let msg = [];
      switch (atom.eventtype) {

      case 'issue':
        // we've already output the issues
        if (includeIssues) { msg = formatIssue(atom); }
        break;

      case 'comment':
        if (includeComments) { msg = formatComment(atom); }
        break;

      case 'event':
        if (includeEvents) { msg = formatEvent(atom); }
        break;

      default:
        msg = [`UNKNOWN EVENTTYPE ${atom.eventtype}`];

      }

      if (msg.length > 0) { txt.push(msg.join('\n')); }

    }

    return txt.join('\n');

  };

  var issues = require('./' + filename);
  var text = narrate(issues, include);

  return text;

};

module.exports = narrative;
