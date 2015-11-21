'use strict';

// TODO: expose some of this, purely for testing
// but then, who knows....
var narrative = function(filename) {

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

    msg.push(`There are ${atoms.issues.length} issues.`);
    msg.push(`There are ${atoms.comments.length} comments.`);
    msg.push(`There are ${atoms.events.length} events.`);

    // TODO: capture # of admin issues
    // TODO: capture # of preview issues
    // TODO: capture # of completed issues

    return msg.join('\n');

  };

  // TODO: should be passing in atom instead of event
  var formatIssue = function(event) {

    var msg = [];

    let openDate = new Date(event.created_at).toString().replace(/ GMT.*/, ''),
        issue = event.payload,
        name = issue.user.login,
        title = issue.title;

    // some variations and comments on notable things
    // morning, afternoon, evening, middle-of-the-night (which will not be accurate, but whatevs)

    msg = [`On ${openDate}, ${name} opened a new issue called "${title}". It has a rank of ${event.rank}.`];

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
    rankAtoms(atoms);

    // oldest first
    var dateSorter = function(a,b) {
      return new Date(a.created_at) - new Date(b.created_at);
    };

    // highest first
    var rankSorter = function(a,b) {
      // console.log(`${a.payload.title} : ${a.rank} <=> ${b.payload.title} : ${b.rank}`);
      return b.rank - a.rank;
    };

    atoms.issues.sort(rankSorter);
    atoms.comments.sort(dateSorter);
    atoms.events.sort(dateSorter);
    atoms.timeline.sort(dateSorter);

    // TODO: overview
    txt.push(formatOverview(atoms));

    for (let atom of atoms.issues) {
      let msg = formatIssue(atom);
      txt.push(msg.join(' ').trim());
    }

    // note: the timeline is date sorted, not rank-sorted (as only the issues are rank-sorted)
    for (let atom of atoms.timeline) {
      let msg = [];
      switch (atom.eventtype) {

      case 'issue':
        // we've already output the issues
        // msg = formatIssue(atom);
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

      if (msg.length > 0) { txt.push(msg.join(' ').trim()); }

    }

    return txt.join('\n');

  };

  var issues = require('./' + filename);
  var text = narrate(issues);

  return text;

};

module.exports = narrative;
