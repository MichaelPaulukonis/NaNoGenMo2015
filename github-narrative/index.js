var request = require('request'); // https://www.npmjs.com/package/request

// temporary hard-coded username
// https://developer.github.com/v3/activity/events/
// can only grab last 90 days of events/300 items
// whichever is less
var url = 'https://api.github.com/users/MichaelPaulukonis/events';


var askforit = function() {

  // http://stackoverflow.com/a/21384582/41153
  var options = {
    url: url,
    headers: {'user-agent': 'node.js'}
  };

  return new Promise(function(resolve, reject) {

    request(options, function(error, response, body) {
      // console.log('error: ' + error);
      // console.log('response: ' + response);
      // console.log('body: ' + body);
      if(!error && response.statusCode === 200) {
        console.log('SUCCESS!');
        resolve(body);
      }
    });

  });

};

askforit().then(function(body) {
  // console.log(`length: ${body.length}`);
  // console.log(typeof body);
  var events = {};
  if (body.length > 0) {
    events = JSON.parse(body);
  }
  console.log(events.length);

  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    // there are other types, and they should be handled as well.
    if (event.type === 'IssueCommentEvent') {
      console.log(`type: ${event['type']}`);
      console.log(`created_at: ${event['created_at']}`);
      // console.log('payload: ', event['payload']);
      console.log(event.payload.comment.body);
      // comment: payload.comment.body
    }
  }


  // for(var event in events) {

  //   if (events[event].created_at) {
  //     console.log(events[event].created_at);
  //   }

  //   for (var prop in events[event]) {
  //     console.log(`property: ${prop} value: ${events[event][prop]}`);
  //   }

});
